import React, { useEffect, useState } from 'react'
import styles from './payment-details.module.css'
import Title from '../Title/Title'
import Svg from './../../svgs/Svg'
import Lang from '../Lang/Lang'
import { useSelector, useDispatch } from 'react-redux'
import fixNum from '../../Func.wallet/fixNum'

const PaymentDetails = ({ pageCurrent, receiver, data }) => {
	const dispatch = useDispatch()
	const [eth, setEth] = useState(null)
	const [price, setPrice] = useState(null)
	const [loaded, setLoaded] = useState([])
	const { arrivalTime, swapPercent, allCoins } = useSelector(
		(state) => state.wallet
	)

	useEffect(() => {
		let eth = allCoins.filter((item) => item.symbol.toUpperCase() == 'ETH')
		setEth(eth[0])
	}, [allCoins])

	useEffect(() => {
		if (data.length) {
			let num =
				data[0].market_data.current_price.usd /
				data[1].market_data.current_price.usd

			setPrice(num)
		} else if (data && eth != null && eth.market_data) {
			let num =
				data.market_data.current_price.usd / eth.market_data.current_price.usd
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
						{swapPercent != null ? swapPercent.value + '%' : '2%'}
						<button className={styles.button} onClick={() => navigate('/swap-settings')}>
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
							? data[0].symbol.toUpperCase()
							: data
							? data.symbol.toUpperCase()
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
						&lt;{arrivalTime} <Lang eng='min' cny='分钟' />
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
						<span>{receiver}</span>
					</li>
				) : (
					<></>
				)}
			</ul>
		</div>
	)
}
export default PaymentDetails
