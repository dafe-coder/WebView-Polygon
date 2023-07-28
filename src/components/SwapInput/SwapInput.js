import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './swap-input.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	setAssetSwapPrice1,
	setAssetSwapPrice2,
	setAssetSwapValue,
} from '../../actions/wallet'
import Lang from '../Lang/Lang'
import fixNum from './../../Func.wallet/fixNum'

const SwapInput = ({ type, dataItem1, dataItem2 }) => {
	const dispatch = useDispatch()
	const { assetSwapPrice1, assetSwapPrice2, swap, assetSwapValue } =
		useSelector((state) => state.wallet)
	const [value, setValue] = useState('')
	const [valueWord, setValueWord] = useState('')
	const [valueWord2, setValueWord2] = useState('')
	const [value2, setValue2] = useState('')

	useEffect(() => {
		if (dataItem1 != null && dataItem2 != null && value != '' && value >= 0) {
			dispatch(
				setAssetSwapPrice1(
					(+Number(value) * dataItem1.market_data.current_price.usd) /
						dataItem2.market_data.current_price.usd
				)
			)
		}
	}, [valueWord])
	useEffect(() => {
		if (dataItem1 != null && dataItem2 != null && value2 != '' && value2 >= 0) {
			dispatch(
				setAssetSwapPrice2(
					(+Number(value2) * dataItem2.market_data.current_price.usd) /
						dataItem1.market_data.current_price.usd
				)
			)
		}
	}, [valueWord2])
	useEffect(() => {
		if (dataItem1 && dataItem1 != null) {
			setValue2('')
			setValue('')
		}
	}, [swap])

	useEffect(() => {
		if (assetSwapPrice1 && assetSwapPrice1 != '') {
			setValue2(fixNum(assetSwapPrice1))
		}
	}, [assetSwapPrice1])
	useEffect(() => {
		if (assetSwapPrice2 && assetSwapPrice2 != '') {
			setValue(fixNum(assetSwapPrice2))
		}
	}, [assetSwapPrice2])
	useEffect(() => {
		setValue(assetSwapValue)
	}, [assetSwapValue])
	const onChoosePersent = (value) => {
		if (dataItem1 != null) {
			setValue(
				(dataItem1.market_data.balance / 100) *
					Number(value.replace(/[^0-9]/g, ''))
			)
			setValueWord(
				(dataItem1.market_data.balance / 100) *
					Number(value.replace(/[^0-9]/g, ''))
			)
			dispatch(
				setAssetSwapValue(
					(dataItem1.market_data.balance / 100) *
						Number(value.replace(/[^0-9]/g, ''))
				)
			)
		}
	}
	const onMax = () => {
		dispatch(setAssetSwapValue(dataItem1.market_data.balance))
		setValue(dataItem1.market_data.balance)
		setValueWord(dataItem1.market_data.balance)
	}
	const onTypeInput1 = (e) => {
		dispatch(setAssetSwapValue(e.target.value))
		setValueWord(e.target.value)
		setValue(e.target.value)
	}
	const onTypeInput2 = (e) => {
		setValueWord2(e.target.value)
		setValue2(e.target.value)
	}
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
									{dataItem1 != null
										? fixNum(dataItem1.market_data.balance)
										: 0}{' '}
									{dataItem1 != null ? dataItem1.symbol : 'ETH'}
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
									{dataItem2 != null
										? fixNum(dataItem2.market_data.balance)
										: 0}{' '}
									{dataItem2 != null ? dataItem2.symbol : 'USDT'}
								</span>
							</p>
						</div>
						<div className={styles.bottom}>
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
