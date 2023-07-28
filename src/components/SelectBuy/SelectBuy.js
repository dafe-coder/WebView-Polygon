import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './select.module.css'
import Svg from '../../svgs/Svg'
import { useDispatch, useSelector } from 'react-redux'
import { setTokenTransaction } from '../../actions/wallet'
import { setTokenBuy } from '../../actions/wallet'
import Lang from '../Lang/Lang'
const SelectBuy = ({ setValidToken }) => {
	const dispatch = useDispatch()
	const { currencyValue, currentCurrency, tokenBuy, lang, allCoins } =
		useSelector((state) => state.wallet)
	const [value, setValue] = useState('')
	const [priceToken, setPriceToken] = useState('')
	const [active, setActive] = useState(
		(<Lang eng='Select a token' cny='选择一个令牌' />).props[lang]
	)
	const [activeElem, setActiveElem] = useState({})
	const [openDropdown, setOpenDropdown] = useState(false)
	const [dataAllFiltered, setDataAllFiltered] = useState([])

	useEffect(() => {
		setDataAllFiltered(allCoins)
	}, [allCoins])

	useEffect(() => {
		let filtered = []
		if (value != '') {
			filtered = allCoins.filter(
				(item) => item.name.toLowerCase().indexOf(value.toLowerCase()) != -1
			)
		} else {
			filtered = allCoins
		}
		setDataAllFiltered(filtered)
	}, [value])

	const onChooseToken = (item) => {
		let elemChoose = allCoins.filter((token) => token.name == item.name)
		setActiveElem(elemChoose[0])
		setActive(item.name)
		setOpenDropdown(false)
		setValidToken(true)
		dispatch(setTokenBuy(elemChoose))
	}
	useEffect(() => {
		if (tokenBuy.length) {
			addValue()
		}
	}, [currencyValue, tokenBuy, currentCurrency])
	const addValue = () => {
		let price =
			tokenBuy[0].market_data.current_price[currentCurrency.toLowerCase()]
		setPriceToken((currencyValue / price).toFixed(6))
	}

	return (
		<div className={styles.body}>
			<label className={styles.label_relative}>
				<Lang eng='Asset Name' cny='资产名称' />
			</label>
			<div className={styles.dropdown}>
				<button className={styles.select}>
					<span
						style={{ flexGrow: '1', flexShrink: '0' }}
						onClick={() => setOpenDropdown(!openDropdown)}>
						{active ==
						(<Lang eng='Select a token' cny='选择一个令牌' />).props[lang] ? (
							active
						) : (
							<div className={styles.item}>
								<div className={styles.logo}>
									<img src={activeElem.image.thumb} alt={activeElem.name} />
								</div>
								<h4 className={styles.title}>{activeElem.name}</h4>
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
						disabled
						value={priceToken}
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
									key={item.id}
									className={cn({
										[styles.active]: active == item.name,
									})}
									onClick={() => onChooseToken(item)}>
									<div className={styles.logo}>
										<img src={item.image.thumb} alt='' />
									</div>
									<div className={styles.info}>
										<h5 className={styles.title}>{item.name}</h5>
										<p className={styles.par}>Bitcoin</p>
									</div>
								</li>
							)
						})
					) : (
						<h4>Nothing</h4>
					)}
				</ul>
			</div>
		</div>
	)
}
export default SelectBuy
