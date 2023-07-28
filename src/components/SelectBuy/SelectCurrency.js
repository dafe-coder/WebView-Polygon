import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './select.module.css'
import Svg from '../../svgs/Svg'
import useWalletService from '../../services/WalletService'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { setTokenTransaction } from '../../actions/wallet'
import dollarLogo from './usd.png'
import cnyLogo from './cny.png'
import eurLogo from './eur.png'
import cadLogo from './cad.png'
import rubLogo from './rub.png'
import jpnLogo from './jpy.png'
import plnLogo from './pln.png'
import { setCurrencyValue, setCurrentCurrency } from '../../actions/wallet'
import Lang from '../Lang/Lang'
const SelectCurrency = ({ setValidCurrency }) => {
	const dispatch = useDispatch()
	const { lang } = useSelector((state) => state.wallet)
	const [value, setValue] = useState('')
	const [valueCurrency, setValueCurrency] = useState('')
	const [active, setActive] = useState(
		(<Lang eng='Select a currency' cny='选择货币' />).props[lang]
	)
	const [activeElem, setActiveElem] = useState({})
	const [openDropdown, setOpenDropdown] = useState(false)
	const [currencyArr, setCurrencyArr] = useState([])
	const [dataAllFiltered, setDataAllFiltered] = useState([])

	useEffect(() => {
		setCurrencyArr([
			{ symbol: 'USD', image: dollarLogo },
			{ symbol: 'CNY', image: cnyLogo },
			{ symbol: 'EUR', image: eurLogo },
			{ symbol: 'CAD', image: cadLogo },
			{ symbol: 'RUB', image: rubLogo },
			{ symbol: 'JPY', image: jpnLogo },
			{ symbol: 'PLN', image: plnLogo },
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
		let elemChoose = currencyArr.filter(
			(currency) => currency.symbol == item.symbol
		)
		setActiveElem(elemChoose[0])
		setActive(item.symbol)
		setOpenDropdown(false)
		setValidCurrency(true)
		dispatch(setCurrentCurrency(item.symbol))
	}

	const onWriteCurrency = (e) => {
		setValueCurrency(e.target.value)
		dispatch(setCurrencyValue(e.target.value))
	}

	return (
		<div className={styles.body} style={{ marginBottom: '20px' }}>
			<label className={styles.label_relative}>
				<Lang eng='You pay' cny='你付钱' />
			</label>
			<div className={styles.dropdown}>
				<button className={styles.select}>
					<span
						style={{ flexGrow: '1', flexShrink: '0' }}
						onClick={() => setOpenDropdown(!openDropdown)}>
						{active ==
						(<Lang eng='Select a currency' cny='选择货币' />).props[lang] ? (
							active
						) : (
							<div className={styles.item}>
								<div className={styles.logo}>
									<img src={activeElem.image} />
								</div>
								<h4 className={styles.title}>{activeElem.symbol}</h4>
							</div>
						)}
					</span>
					<Svg
						type='arr-sm-down'
						className={cn(styles.svg, {
							[styles.active_svg]: openDropdown == true,
						})}
					/>
					<input
						className={styles.input_value}
						type='text'
						placeholder='0'
						value={valueCurrency}
						onChange={(e) => onWriteCurrency(e)}
					/>
				</button>
				<ul
					className={cn(styles.list, {
						[styles.open]: openDropdown == true,
					})}>
					<li className={styles.search}>
						<input
							type='text'
							id='search-assets-transaction'
							className={styles.input}
							required={true}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						<label htmlFor='search-assets-transaction' className={styles.label}>
							<Svg type='search' />
							<Lang eng='Search for asset' cny='搜索资产' />
						</label>
					</li>
					{dataAllFiltered.length >= 1 ? (
						dataAllFiltered.map((item) => {
							return (
								<li
									key={item.symbol}
									className={cn({
										[styles.active]: active == item.symbol,
									})}
									onClick={() => onChooseToken(item)}>
									<div className={styles.logo}>
										<img src={item.image} alt='' />
									</div>
									<div className={styles.info}>
										<h5 className={styles.title}>{item.symbol}</h5>
									</div>
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
	)
}
export default SelectCurrency
