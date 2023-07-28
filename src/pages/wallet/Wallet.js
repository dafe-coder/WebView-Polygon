import React, { useState, useEffect, useCallback } from 'react'
import styles from './wallet.module.css'
import { useDispatch } from 'react-redux'
import ApexChart from '../../components/PieChar/PieChar'
import PortfolioList from './../../components/PortfolioList/PortfolioList'
import TransferBtn from '../../components/TransferBtn/TransferBtn'
import Title from '../../components/Title/Title'
import Buttons from './../../components/Buttons/Buttons'
import { useSelector } from 'react-redux'
// import { setCurrentPage } from '../../actions/createActions'
import Sort from '../../components/Sort/Sort'
import Svg from './../../svgs/Svg'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import { fetchDataWallet, fetchAllCoins, setAllCoins } from '../../store/slices/walletSlice'
import { rebuildObjPortfolioDefaultCoins } from '../../Func.wallet/rebObj'
import { setInitChooseAssets } from '../../store/slices/storageSlice'
import Menu from '../../components/Menu/Menu'

let idTimeout

export const Wallet = ({
	loadingChar,
	width,
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { dataWallet, coins, walletAddress, walletNew, portfolioSort } = useSelector(
		(state) => state.wallet
	)
	const { currentNetwork, currentAccount, dataUser, chooseAssets } =
		useSelector((state) => state.storage)
	const [balance, setBalance] = React.useState(null)
	const [balanceChange, setBalanceChange] = React.useState(null)
	const [balanceCoins, setBalanceCoins] = React.useState([])
	const [showFilterBody, setShowFilterBody] = React.useState(false)
	const [portfolioListSorted, setPortfolioListSorted] = React.useState([])
	const [filterName, setFilterName] = React.useState('Volume')
	const [btnsOut, setBtnsOut] = React.useState(false)
	const [sortOpen, setSortOpen] = React.useState(false)

	React.useEffect(() => {
		if (dataWallet === null && dataUser !== null) {
			let account = dataUser.find((item) => item.name === currentAccount)
			dispatch(
				fetchDataWallet([
					account.phrase !== '' ? account.phrase : account.privateKey,
					walletNew,
				])
			)
		}
	}, [dataUser, dataWallet])

	React.useEffect(() => {
		if (coins === null) {
			dispatch(fetchAllCoins())
		}
	}, [coins])

	React.useEffect(() => {
		if (currentAccount !== '' && walletAddress !== '') {
			let account = dataUser.find((item) => item.name === currentAccount)
			if (account.address === '') {
				dispatch(
					setAddressCurrentAccount({
						name: currentAccount,
						address: walletAddress,
					})
				)
			}
		}
	}, [currentAccount, walletAddress])

	React.useEffect(() => {
		if (balanceCoins.length) {
			filterData('volume', balanceCoins)
		}
	}, [balanceCoins])

	const filterData = (type, list = balanceCoins) => {
		setPortfolioListSorted([])
		idTimeout = setTimeout(() => {
			let sortedArr = []
			if (type == 'name') {
				sortedArr = list.sort(function (a, b) {
					if (a.name.toUpperCase() > b.name.toUpperCase()) {
						return 1
					}
					if (a.name.toUpperCase() < b.name.toUpperCase()) {
						return -1
					}
					return 0
				})
			} else if (type == 'volume') {
				sortedArr = list.sort(function (a, b) {
					if (a.market_data.balance_crypto > b.market_data.balance_crypto) {
						return -1
					}
					if (a.market_data.balance_crypto < b.market_data.balance_crypto) {
						return 1
					}
					return 0
				})
			} else if (type == 'change') {
				sortedArr = list.sort(function (a, b) {
					if (a.changes.percent > b.changes.percent) {
						return -1
					}
					if (a.changes.percent < b.changes.percent) {
						return 1
					}
					return 0
				})
			} else {
				sortedArr = list
			}
			setPortfolioListSorted(sortedArr)
			clearTimeout(idTimeout)
		}, 100)
	}

	React.useEffect(() => {
		if (
			coins !== null &&
			dataWallet !== null &&
			dataWallet.positions?.length &&
			coins.length
		) {
			const dataWalletCoins = rebuildObjPortfolio(dataWallet.positions)
			const filteredNetworks = dataWalletCoins.filter(
				(item) =>
					item.market_data.chain.toLowerCase() == currentNetwork.toLowerCase()
			)
			const dataWalletSymbols = dataWalletCoins.map((item) =>
				item.symbol.toLowerCase()
			)

			const otherCoins = rebuildObjPortfolioDefaultCoins(coins)
			const filteredOther = otherCoins.filter(
				(item) => dataWalletSymbols.includes(item.symbol.toLowerCase()) == false
			)

			dispatch(setAllCoins([...filteredNetworks, ...filteredOther]))

			const coinsSymbols = filteredNetworks.map((item) =>
				item.symbol.toLowerCase()
			)
			const chooseCoins = otherCoins.filter(
				(item) =>
					chooseAssets.includes(item.symbol.toLowerCase()) &&
					!coinsSymbols.includes(item.symbol.toLowerCase())
			)
			setBalanceCoins([...filteredNetworks, ...chooseCoins])
		} else if (dataWallet !== null && coins !== null) {
			const otherCoins = rebuildObjPortfolioDefaultCoins(coins)
			const chooseCoins = otherCoins.filter((item) =>
				chooseAssets.includes(item.symbol.toLowerCase())
			)
			setBalanceCoins(chooseCoins)
			dispatch(setAllCoins(otherCoins))
		}
	}, [coins, dataWallet, currentNetwork, chooseAssets])

	React.useEffect(() => {
		if (dataWallet !== null && dataWallet.positions?.length) {
			setBalance(
				dataWallet.portfolio.attributes.positions_distribution_by_chain[
					currentNetwork.toLowerCase()
				]
			)
			setBalanceChange({
				perc: dataWallet.portfolio.attributes.changes.percent_1d,
				usd: dataWallet.portfolio.attributes.changes.absolute_1d,
			})
		} else {
			setBalance(0)
		}
	}, [dataWallet, currentNetwork])

	const onFilter = (value) => {
		setFilterName(value)
		filterData(value, balanceCoins)
		setShowFilterBody(false)
	}

	return (
		<section className={'bg-white'} style={{position: 'relative'}}>
			<div className='wallet-body'>
				<div className='wallet-header' style={{ marginBottom: '20px' }}>
					<Buttons
						type='notification'
						onClick={() =>
							console.log(1)
						}></Buttons>
					<Title>
						<Lang eng='Your Account' cny='您的帐户' />
					</Title>
					<Buttons
						// onClick={() => dispatch(setCurrentPage('Accounts'))}
						type='account'></Buttons>
				</div>
				<div className='wallet-top' style={{ position: 'relative' }}>
					<TransferBtn
						// onClick={() => dispatch(setCurrentPage('Sent'))}
						type='send'
						style={btnsOut ? { left: '-120px' } : {}}>
						<Lang eng='Transfer' cny='转移' />
					</TransferBtn>
					<ApexChart
						state={{
                            options: {
                              chart: {
                                id: "basic-bar"
                              },
                              xaxis: {
                                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                              }
                            },
                            series: [
                              {
                                name: "series-1",
                                data: [30, 40, 45, 50, 49, 60, 70, 91]
                              }
                            ]
                          }
                        }
						setWidth={() => console.log(3)}
						width={width}
						loadingChar={loadingChar}
						setBtnsOut={setBtnsOut}
					/>
					<TransferBtn
						// onClick={() => dispatch(setCurrentPage('Receive'))}
						type='receive'
						style={btnsOut ? { right: '-120px' } : {}}>
						<Lang eng='Receive' cny='收到' />
					</TransferBtn>
				</div>
				<div className='wallet-bottom'>
					<ul className={styles.navigation}>
						<li onClick={() => console.log(1)}>
							<span>
								<Svg type='plus-bold' />
								<Lang eng='Manage assets' cny='管理资产' />
							</span>
						</li>
						<li
							style={{ position: 'relative' }}
							onClick={() => setSortOpen(!sortOpen)}>
							<span>
								<Svg type='filter-light' />
								<Lang eng='Portfolio' cny='文件夹' />{' '}
								{portfolioSort[0].toUpperCase() + portfolioSort.slice(1)}
								<Svg type='check' />
							</span>
							<Sort filterData={filterData} sortOpen={sortOpen} />
						</li>
					</ul>
					<PortfolioList
						data={portfolioListSorted}
						className={styles.portfolio_list}
					/>
				</div>
			</div>
			<Menu />
		</section>
	)
}