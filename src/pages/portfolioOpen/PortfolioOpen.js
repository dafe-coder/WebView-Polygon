import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Title from '../../components/Title/Title'
import TransactionBtn from '../../components/TransactionsBtn/TransactionBtn'
import TransactionInfo from './../../components/TransactionInfo/TransactionInfo'
import style from './transaction.module.css'
import TransactionList from './../../components/TransactionList/TransactionList'
import Buttons from '../../components/Buttons/Buttons'
import Lang from '../../components/Lang/Lang'
import LoaderList from '../../components/Loader/LoaderList'
import { useLocation, useNavigate } from 'react-router-dom'

export const PortfolioOpen = () => {
	const navigate = useNavigate()
	const {state} = useLocation()
	const { dataWallet } = useSelector((state) => state.wallet)
	const [transactionList, setTransactionList] = React.useState([])

	
	React.useEffect(() => {
		if (dataWallet !== null && dataWallet.transactions?.length) {
			let filtered = dataWallet.transactions.filter(
				(item) => item.attributes.status !== 'failed'
			)
			let filteredToken = filtered.filter(
				(item) =>
					item.attributes.transfers[0] &&
					item.attributes.transfers[0].direction !== 'in' &&
					item.attributes.transfers[0].fungible_info.symbol.toLowerCase() ==
						state.symbol.toLowerCase()
			)
			let filteredTokenSwap = filtered.filter(
				(item) =>
					item.attributes.transfers[1] &&
					item.attributes.transfers[1].fungible_info.symbol.toLowerCase() ==
						state.symbol.toLowerCase()
			)
			let arrFinal = [...filteredToken, ...filteredTokenSwap]

			let arrSorted = arrFinal.sort(function (a, b) {
				if (a.attributes.mined_at > b.attributes.mined_at) {
					return -1
				}
				if (a.attributes.mined_at < b.attributes.mined_at) {
					return 1
				}
				return 0
			})

			setTransactionList(arrSorted)
		}
	}, [state, dataWallet])

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-header'>
					<Buttons onClick={() => navigate(-1)} type='back'></Buttons>
					<Title>
						<Lang eng='Transactions' cny='交易' />
					</Title>
					<div></div>
				</div>
				{state !== null && <div className='wallet-top'>
					<TransactionInfo
						cryptoImg={state.image.thumb}
						cryptoName={state.symbol}
						cryptoPrice={state.market_data.balance_crypto}
						current_price={state.market_data.current_price}
					/>
					<div className={style.btns}>
						<TransactionBtn type='send' onClick={() => navigate('/send', {state: state})} />
						<TransactionBtn type='receive' onClick={() => navigate('/receive', {state: state})} />
						<TransactionBtn type='swap' onClick={() => navigate('/swap', {state: state})} />
					</div>
				</div>}
				<div className='wallet-bottom'>
					{dataWallet !== null ? (
						transactionList.length ? (
							<TransactionList data={transactionList} />
						) : (
							<h4>
								<Lang eng='Nothing' cny='没有什么' />
							</h4>
						)
					) : (
						<LoaderList />
					)}
				</div>
			</div>
		</section>
	)
}
