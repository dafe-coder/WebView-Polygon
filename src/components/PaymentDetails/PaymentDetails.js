import React, { useEffect, useState } from 'react'
import styles from './payment-details.module.css'
import Title from '../Title/Title'
import Svg from './../../svgs/Svg'
import Lang from '../Lang/Lang'
import { useSelector, useDispatch } from 'react-redux'
import fixNum from '../../Func.wallet/fixNum'
import { useNavigate } from 'react-router-dom'

const PaymentDetails = ({ receiver, data }) => {
	const navigate = useNavigate()
	const [eth, setEth] = useState(null)
	const [price, setPrice] = useState(null)
	const { allCoins } = useSelector(
		(state) => state.wallet
	)

	const {slippage, deadline} = useSelector(state => state.transaction)
	
	useEffect(() => {
		if(allCoins !== null) {
			let eth = allCoins.filter((item) => item.symbol.toUpperCase() == 'ETH')
			setEth(eth[0])
		}
	}, [allCoins])

	useEffect(() => {
		if (data.length) {
			let num =
				data[0].market_data.current_price /
				data[1].market_data.current_price

			setPrice(num)
		} else if (data && eth != null && eth.market_data) {
			let num =
				data.market_data.current_price / eth.market_data.current_price
			setPrice(num)
		}
	}, [eth, data])

	
	return (
		<div className={styles.body}>
			<Title mb='0' type='sm'>
				<Lang eng='Payment Details' cny='付款详情' />
			</Title>
			<ul className={styles.table}>
				<li>
					<span>
						<Lang eng='Slippage' cny='滑移' />
					</span>
					<span>
						{slippage != null ? slippage.value + '%' : '2%'}
						<button className={styles.button} onClick={() => navigate('/transaction-settings')}>
							<Svg type='cog' />
						</button>
					</span>
				</li>
				<li>
					<span>
						<Lang eng='Price' cny='价格' />
					</span>
					<span>
						1{' '}
						{data.length
							? data[0]?.symbol?.toUpperCase()
							: data
							? data?.symbol?.toUpperCase()
							: ''}{' '}
						= {price != null ? fixNum(price) : 0}{' '}
						{data.length ? data[1].symbol.toUpperCase() : 'ETH'}
					</span>
				</li>
				<li>
					<span>
						<Lang eng='Price impact' cny='价格影响' />
					</span>
					<span>0.01%</span>
				</li>
				<li>
					<span>
						<Lang eng='Arrival Time' cny='到达时间' />
					</span>
					<span>
						&lt;{deadline} <Lang eng='min' cny='分钟' />
					</span>
				</li>
				<li>
					<span>
						<Lang eng='TX Fee' cny='交易费' />
					</span>
					<span>0.3% ~ 0.008 ETH</span>
				</li>
				{receiver ? (
					<li>
						<span>
							<Lang eng='Receiver' cny='接收者' />
						</span>
						<span>{receiver.slice(0,25) + "..." + receiver.slice(-5)}</span>
					</li>
				) : (
					<></>
				)}
			</ul>
		</div>
	)
}
export default PaymentDetails
