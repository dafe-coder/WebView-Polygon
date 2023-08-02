import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './swap-input.module.css'
import { useDispatch, useSelector } from 'react-redux'
// import {
// 	setAssetSwapPrice1,
// 	setAssetSwapPrice2,
// 	setAssetSwapValue,
// } from '../../actions/wallet'
import Lang from '../Lang/Lang'
import fixNum from './../../Func.wallet/fixNum'

const SwapInput = ({ type, setValue, setValue2, value, value2 }) => {
	const { chooseCoinOne, chooseCoinTwo} =
		useSelector((state) => state.transaction)
	
	const onChoosePersent = (value) => {
		if (chooseCoinOne !== null) {
			setValue(
				(chooseCoinOne.market_data.balance / 100) *
					Number(value.replace(/[^0-9]/g, ''))
			)
		}
	}
	const onMax = () => {
		if (chooseCoinOne !== null) {
			setValue(chooseCoinOne.market_data.balance)
		}
	}
	const onTypeInput1 = (e) => {
		setValue(e.target.value)
	}
	const onTypeInput2 = (e) => {
		setValue2(e.target.value)
	}

	React.useEffect(() => {
		if(chooseCoinOne !== null && chooseCoinTwo !== null && value !== '') {
			setValue2(value * chooseCoinOne.market_data.current_price / chooseCoinTwo.market_data.current_price)
		}
	}, [chooseCoinOne, chooseCoinTwo, value])

	switch (type) {
		case 'sell':
			return (
				<div className={styles.swap_input}>
					<div className={styles.body}>
						<div className={styles.top}>
							<span className={styles.title}>
								<Lang eng='sell' cny='卖' />
							</span>
							<p className={styles.balance}>
								<Lang eng='Balance' cny='平衡' />:{' '}
								<span>
									{chooseCoinOne != null
										? fixNum(chooseCoinOne.market_data.balance)
										: 0}{' '}
									{chooseCoinOne != null ? chooseCoinOne.symbol.toUpperCase() : 'ETH'}
								</span>
							</p>
						</div>
						<div className={styles.bottom}>
							<input
								onChange={(e) => onTypeInput1(e)}
								className={styles.input}
								type='number'
								value={value}
								placeholder='0.0'
							/>
							<span className={styles.max} onClick={onMax}>
								<Lang eng='Max' cny='最大' />
							</span>
						</div>
					</div>
					<ul className={styles.list}>
						<li onClick={(e) => onChoosePersent(e.target.textContent)}>20%</li>
						<li onClick={(e) => onChoosePersent(e.target.textContent)}>50%</li>
						<li onClick={(e) => onChoosePersent(e.target.textContent)}>75%</li>
						<li onClick={(e) => onChoosePersent(e.target.textContent)}>100%</li>
					</ul>
				</div>
			)
		default:
			return (
				<div className={styles.swap_input}>
					<div className={styles.body}>
						<div className={styles.top}>
							<span className={styles.title}>
								<Lang eng='Buy' cny='买' />
							</span>
							<p className={styles.balance}>
								<Lang eng='Balance' cny='平衡' />:{' '}
								<span>
									{chooseCoinTwo != null
										? fixNum(chooseCoinTwo.market_data.balance)
										: 0}{' '}
									{chooseCoinTwo != null ? chooseCoinTwo.symbol.toUpperCase() : 'USDT'}
								</span>
							</p>
						</div>
						<div className={styles.bottom} style={{pointerEvents: 'none'}}>
							<input
								onChange={(e) => onTypeInput2(e)}
								className={styles.input}
								type='number'
								placeholder='0.0'
								value={value2}
							/>
						</div>
					</div>
				</div>
			)
	}
}
export default SwapInput
