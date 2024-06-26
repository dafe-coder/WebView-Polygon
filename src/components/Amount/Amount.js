import React, { useState, useEffect } from 'react'
import styles from './amount.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Lang from '../Lang/Lang'

const Amount = ({ validToken, setAmount, amount }) => {
	const dispatch = useDispatch()
	const { chooseCoinOne } = useSelector(
		(state) => state.transaction
	)
	const [value, setValue] = useState('')

	const onChoosePersent = (value) => {
		if (chooseCoinOne != null) {
			setValue(
				(chooseCoinOne.market_data.balance / 100) *
					Number(value.replace(/[^0-9]/g, ''))
			)
			setAmount(
					String(
						(chooseCoinOne.market_data.balance / 100) *
							Number(value.replace(/[^0-9]/g, ''))
					)
				)
		}
	}
	const onTypeValue = (e) => {
		if (validToken) {
			setAmount(e.target.value)
			setValue(e.target.value)
		}
	}
	useEffect(() => {
		if (amount != '') {
			setValue(amount)
		}
	}, [amount])
	return (
		<div className='wallet-input'>
			<input
				id='amount'
				className='input'
				type='number'
				value={value}
				onChange={(e) => onTypeValue(e)}
				required={true}
			/>
			<label className='label' htmlFor='amount'>
				<Lang eng='Amount' cny='数量' />
			</label>
			<ul className={styles.list}>
				<li onClick={(e) => onChoosePersent(e.target.textContent)}>20%</li>
				<li onClick={(e) => onChoosePersent(e.target.textContent)}>50%</li>
				<li onClick={(e) => onChoosePersent(e.target.textContent)}>75%</li>
				<li onClick={(e) => onChoosePersent(e.target.textContent)}>100%</li>
			</ul>
		</div>
	)
}
export default Amount
