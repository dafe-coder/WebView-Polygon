import React, { useState, useEffect } from 'react'
import Title from '../../components/Title/Title'
import Buttons from '../../components/Buttons/Buttons'
import styles from './select-currency.module.css'
import Svg from '../../svgs/Svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrencyWallet } from '../../store/slices/storageSlice'
import Lang from '../../components/Lang/Lang'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

export const SelectCurrency = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
	const { currencyWallet } = useSelector((state) => state.storage)
	const [value, setValue] = useState('')
	const [currencyArr, setCurrencyArr] = useState([])
	const [dataAllFiltered, setDataAllFiltered] = useState([])


	useEffect(() => {
		setCurrencyArr([
			{ symbol: 'USD' },
			{ symbol: 'CNY' },
			{ symbol: 'EUR' },
			{ symbol: 'CAD' },
			{ symbol: 'RUB' },
			{ symbol: 'JPY' },
			{ symbol: 'PLN' },
		])
	}, [])
	useEffect(() => {
		setDataAllFiltered(currencyArr)
	}, [currencyArr])

	useEffect(() => {
		let filtered = []
		if (value != '') {
			filtered = currencyArr.filter(
				(item) => item.symbol.toLowerCase().indexOf(value.toLowerCase()) != -1
			)
		} else {
			filtered = currencyArr
		}
		setDataAllFiltered(filtered)
	}, [value])

	const onChooseToken = (item) => {
		dispatch(setCurrencyWallet(item.symbol))
	}

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate(-1)}
							type='back'
						/>
						<Title>
							<Lang eng='Select Currency' cny='选择货币' />
						</Title>
						<div></div>
					</div>
				</div>
				<div className='wallet-bottom'>
					<div className={styles.body}>
						<div className='wallet-input'>
							<input
								onChange={(e) => setValue(e.target.value)}
								type='search'
								className='input'
								id='search-currency'
								required={true}
							/>
							<label htmlFor='search-currency' className='label'>
								<Svg type='search' />
								<Lang eng='Search for currency' cny='搜索货币' />
							</label>
						</div>
						<ul className={styles.list}>
							<li>
								<span>
									<Lang eng='Default' cny='默认' /> (USD)
								</span>
							</li>
							{dataAllFiltered.length >= 1 ? (
								dataAllFiltered.map((item) => {
									return (
										<li
											key={item.symbol}
											className={cn({
												[styles.active]: currencyWallet == item.symbol,
											})}
											onClick={() => onChooseToken(item)}>
											<span>{item.symbol}</span>
										</li>
									)
								})
							) : (
								<h4>
									<Lang eng='Nothing' cny='没有什么' />
								</h4>
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}