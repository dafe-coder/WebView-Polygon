import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './select-token.module.css'
import Svg from '../../svgs/Svg'
import { useDispatch } from 'react-redux'
import { setChooseCoinOne } from '../../store/slices/transactionSlice'
import Lang from '../Lang/Lang'
import { useSelector } from 'react-redux'
import fixNum from '../../Func.wallet/fixNum'

const SelectToken = ({
	dataWithBalance,
	dataLoading,
	noSubtitle,
	portfolioOpen,
	setValidToken,
	swapSelect,
	swapSelectActive,
	transactionTokens = false,
}) => {
	const { lang, tokenTransaction, allCoins } = useSelector(
		(state) => state.wallet
	)
	const dispatch = useDispatch()
	const [value, setValue] = useState('')
	const [active, setActive] = useState(
		(<Lang eng='Select a token' cny='选择一个令牌' />).props[lang]
	)
	const [activeElem, setActiveElem] = useState({})
	const [openDropdown, setOpenDropdown] = useState(false)
	const [dataAll, setDataAll] = useState([])
	const [dataAllFiltered, setDataAllFiltered] = useState([])

	function onTokenRender(item) {
		if (item != null && dataAll.length >= 1 && dataLoading) {
			let elemChoose = dataAll.filter(
				(token) => token.symbol.toLowerCase() == item.symbol.toLowerCase()
			)
			setActiveElem(elemChoose[0])
			setActive(item.symbol)
			setOpenDropdown(false)
			if (transactionTokens == true) {
				dispatch(setChooseCoinOne(elemChoose[0]))
			}
			setValidToken(true)
		}
	}
	useEffect(() => {
		onTokenRender(swapSelectActive)
	}, [dataAll, dataLoading, swapSelectActive])
	useEffect(() => {
		onTokenRender(tokenTransaction)
	}, [dataAll, dataLoading, tokenTransaction])
	useEffect(() => {
		if (
			portfolioOpen != '' &&
			portfolioOpen != undefined &&
			dataAll.length >= 1 &&
			dataLoading
		) {
			let elemChoose = dataAll.filter(
				(token) => token.symbol.toLowerCase() == portfolioOpen.toLowerCase()
			)
			setActiveElem(elemChoose[0])

			setActive(portfolioOpen)
			setOpenDropdown(false)
			if (transactionTokens == true) {
				dispatch(setChooseCoinOne(elemChoose[0]))
			}
			setValidToken(true)
			if (swapSelect) {
				dispatch(setChooseCoinOne(elemChoose[0]))
			}
		}
	}, [portfolioOpen, dataAll, dataLoading])

	useEffect(() => {
		let filtered = []
		if (value != '') {
			filtered = dataAll.filter(
				(item) =>
					item.symbol.toLowerCase().indexOf(value.toLowerCase()) != -1 ||
					item.name.toLowerCase().indexOf(value.toLowerCase()) != -1
			)
		} else {
			filtered = dataAll
		}
		setDataAllFiltered(filtered)
	}, [value])
	useEffect(() => {
		if (dataWithBalance !== 0 && dataLoading) {
			const balanceArr = dataWithBalance.map((item) =>
				item.symbol.toLowerCase()
			)
			let filtered = allCoins.filter((per) => {
				if (balanceArr.includes(per.symbol.toLowerCase()) == false) {
					return per
				}
			})
			setDataAll([...dataWithBalance, ...filtered])
			setDataAllFiltered([...dataWithBalance, ...filtered])
		} else if (dataWithBalance === 0 && dataLoading) {
			setDataAll(allCoins)
			setDataAllFiltered(allCoins)
		}
	}, [allCoins, dataWithBalance, dataLoading])

	const onChooseToken = (item) => {
		let elemChoose = dataAll.filter((token) => token.symbol == item.symbol)
		setActiveElem(elemChoose[0])
		setActive(item.symbol)
		setOpenDropdown(false)
		if (transactionTokens == true) {
			dispatch(setChooseCoinOne(elemChoose[0]))
		}
		if (swapSelect) {
			swapSelect(elemChoose[0])
		}
		setValidToken(true)
	}

	return (
		<div className={styles.body}>
			<label
				className={styles.label_relative}
				style={noSubtitle ? { display: 'none' } : { display: 'block' }}>
				<Lang eng='Asset Name' cny='资产名称' />
			</label>
			<div className={styles.dropdown}>
				<button
					className={styles.select}
					onClick={() => setOpenDropdown(!openDropdown)}>
					{active ==
					(<Lang eng='Select a token' cny='选择一个令牌' />).props[lang] ? (
						active
					) : (
						<div className={styles.item}>
							<div className={styles.logo}>
								<img
									src={activeElem.image ? activeElem.image.thumb : ''}
									alt=''
								/>
							</div>
							<h4 className={styles.title}>{activeElem.symbol}</h4>
						</div>
					)}
					<Svg
						type='arr-sm-down'
						className={cn(styles.svg, {
							[styles.active_svg]: openDropdown == true,
						})}
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
										[styles.active]: active == item.symbol,
									})}
									onClick={() => onChooseToken(item)}>
									<div className={styles.logo}>
										<img src={item.image.thumb} alt='' />
									</div>
									<div className={styles.info}>
										<h5 className={styles.title}>{item.symbol}</h5>
										<p className={styles.par}>{item.name}</p>
									</div>
									<span>{fixNum(item.market_data.balance)}</span>
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
export default SelectToken
