import React from 'react'
import cn from 'classnames'
import styles from './sort.module.css'
import { setPortfolioSort } from '../../store/slices/walletSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Lang from '../Lang/Lang'

const Sort = ({ filterData, sortOpen }) => {
	const { portfolioSort } = useSelector((state) => state.wallet)
	const { lang } = useSelector((state) => state.storage)

	const dispatch = useDispatch()
	function onFilter(value) {
		filterData(value)
		dispatch(setPortfolioSort(value))
	}
	return (
		<ul
			className={cn(styles.body, {
				[styles.open]: sortOpen == true,
			})}>
			<li
				onClick={() => onFilter((<Lang eng='value' cny='价值' />).props[lang])}
				className={cn({
					[styles.active]:
						portfolioSort == (<Lang eng='value' cny='价值' />).props[lang],
				})}>
				<Lang eng='Portfolio Value' cny='投资组合价值' />
			</li>
			<li
				className={cn({
					[styles.active]:
						portfolioSort == (<Lang eng='name' cny='姓名' />).props[lang],
				})}
				onClick={() => onFilter((<Lang eng='name' cny='姓名' />).props[lang])}>
				<Lang eng='Name' cny='姓名' />
			</li>
			<li
				className={cn({
					[styles.active]:
						portfolioSort == (<Lang eng='change' cny='改变' />).props[lang],
				})}
				onClick={() =>
					onFilter((<Lang eng='change' cny='改变' />).props[lang])
				}>
				<Lang eng='24H Change' cny='24小时变化' />
			</li>
		</ul>
	)
}
export default Sort
