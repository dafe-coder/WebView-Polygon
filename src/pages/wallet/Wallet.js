import React from 'react'
import styles from './wallet.module.css'
import { useDispatch } from 'react-redux'
import Title from '../../components/Title/Title'
import Buttons from './../../components/Buttons/Buttons'
import { useSelector } from 'react-redux'
import Sort from '../../components/Sort/Sort'
import Svg from './../../svgs/Svg'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import { fetchDataWallet, fetchAllCoins, setAllCoins, fetchCurrencyPrice, setCurrencyPrice } from '../../store/slices/walletSlice'
import { rebuildObjPortfolioDefaultCoins, rebuildObjPortfolio} from '../../Func.wallet/rebObj'
import { setAddressCurrentAccount} from '../../store/slices/storageSlice'
import Menu from '../../components/Menu/Menu'
import LoaderPrice from '../../components/Loader/LoaderPrice';
import LoaderPriceChange from '../../components/Loader/LoaderPriceChange';
import PortfolioList from '../../components/PortfolioList/PortfolioList';

export const Wallet = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { dataWallet, coins, walletNew,walletPrices, portfolioSort, currencyPrice, status } = useSelector(
		(state) => state.wallet
	)
	const { currentNetwork, currentAccount, dataUser, chooseAssets, currencyWallet } =
		useSelector((state) => state.storage)
	const [balanceCoins, setBalanceCoins] = React.useState([])
	const [portfolioListSorted, setPortfolioListSorted] = React.useState([])
	const [sortOpen, setSortOpen] = React.useState(false)

	React.useEffect(() => {
		if(currencyPrice === null && currencyWallet.toLowerCase() !== 'usd') {
			dispatch(fetchCurrencyPrice(currencyWallet))
		} else if (currencyWallet.toLowerCase() === 'usd') {
			dispatch(setCurrencyPrice(1))
		}
	}, [currencyPrice, currencyWallet])
		
	React.useEffect(() => {
		console.log(1);
		if (dataWallet === null && dataUser !== null && status === 'initial') {
			let account = dataUser.find((item) => item.name === currentAccount)
			console.log(account);
			if(account !== undefined) {
				dispatch(
					fetchDataWallet([
						account.phrase !== '' ? account.phrase : account.privateKey,
						walletNew,
					])
				)
			}
		}
	}, [])

	React.useEffect(() => {
		if (dataWallet !== null && dataUser !== null) {
			let account = dataUser.find((item) => item.name === currentAccount)
			if(account.address === '' || account.address === undefined ) {
				dispatch(setAddressCurrentAccount({address: dataWallet.address, name: currentAccount}))
			}	
		}
	}, [dataUser, currentAccount])

	React.useEffect(() => {
		if (coins === null) {
			dispatch(fetchAllCoins())
		}
	}, [coins])

	// React.useEffect(() => {
	// 	if (currentAccount !== '' && walletAddress !== '') {
	// 		let account = dataUser.find((item) => item.name === currentAccount)
	// 		if (account.address === '') {
	// 			dispatch(
	// 				setAddressCurrentAccount({
	// 					name: currentAccount,
	// 					address: walletAddress,
	// 				})
	// 			)
	// 		}
	// 	}
	// }, [currentAccount, walletAddress])

	React.useEffect(() => {
		if (balanceCoins.length) {
			filterData(portfolioSort, balanceCoins)
		}
	}, [balanceCoins])

	const filterData = (type, list = balanceCoins) => {
		setPortfolioListSorted([])
		let sortedArr = []
		if (type == 'name') {
			sortedArr = list.sort(function (a, b) {
				const aName = a.name.toUpperCase()
				const bName = b.name.toUpperCase()
				if (aName > bName) {
					return 1
				}
				if (aName < bName) {
					return -1
				}
				return 0
			})
		} else if (type == 'value') {
			sortedArr = list.sort(function (a, b) {
				const aBalance =  a.market_data.balance_crypto
				const bBalance = b.market_data.balance_crypto
				if (aBalance > bBalance) {
					return -1
				}
				if (aBalance < bBalance) {
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

			dispatch(setAllCoins([...dataWalletCoins, ...filteredOther]))

			const coinsSymbols = filteredNetworks.map((item) =>
				item.symbol.toLowerCase()
			)
			const chooseCoins = otherCoins.filter(
				(item) =>
					chooseAssets.includes(item.symbol.toLowerCase()) &&
					!dataWalletSymbols.includes(!item.symbol.toLowerCase())
			)
			setBalanceCoins([...dataWalletCoins, ...chooseCoins])
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
	console.log(walletPrices)
	}, [walletPrices])
	return (
		<section className={'bg-white'} style={{position: 'relative'}}>
			<div className='wallet-body'>
				<div className='wallet-header' style={{ marginBottom: '20px' }}>
					<Buttons
						type='notification'
						onClick={() =>
							navigate('/transaction-history')
						}></Buttons>
					<Title>
						<Lang eng='Your Account' cny='您的帐户' />
					</Title>
					<Buttons
						onClick={() => navigate('/accounts')}
						type='account'></Buttons>
				</div>
				<div className={styles.priceBlock}>
					{walletPrices != null ? (
						<Title
							style={{
								marginBottom: 0,
								marginTop: 0,
								fontSize: '24px',
								lineHeight: '28px',
							}}>
							{setLabelCurrency() +
								fixNum(walletPrices.total_value * priceConvert)}
						</Title>
					) : (
						<div style={{ marginBottom: '4px' }}>
							<LoaderPrice />
						</div>
					)}
					{walletPrices != null ? (
						<div className={styles.priceChange}>
							<span>
								{walletPrices.relative_change_24h < 0 ? '-' : '+'}
								{setLabelCurrency() +
									Math.abs(
										fixNum(walletPrices.absolute_change_24h * priceConvert)
									)}{' '}
								(
								{walletPrices.relative_change_24h > 0 &&
									walletPrices.relative_change_24h.toFixed(2)}
								%)
							</span>
							<span>last 24h</span>
						</div>
					) : (
						<LoaderPriceChange />
					)}
				</div>
				<div className='wallet-bottom'>
					<ul className={styles.navigation}>
						<li onClick={() => navigate('/manage-assets')}>
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