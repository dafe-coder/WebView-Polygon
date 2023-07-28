import React, { useState } from 'react'
import cn from 'classnames'
import styles from './menu.module.css'
import SvgMenu from './Menu-icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Menu = ({ currentPage }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const goFirst = () => {
		navigate('/wallet')
	}
	const goSecond = () => {
		navigate('/swap')
	}
	const goThird = () => {
		navigate('/buy')
	}
	const goFourth = () => {
		navigate('/settings')
	}
	return (
		<ul className={styles.menu}>
			<li
				onClick={goFirst}
				className={cn({
					[styles.active]: currentPage == 'Wallet',
				})}>
				<SvgMenu
					className={cn({
						[styles.disabled]: currentPage != 'Wallet',
					})}
					type='message'
				/>
			</li>
			<li
				onClick={goSecond}
				className={cn({
					[styles.active]: currentPage == 'Swap',
				})}>
				<SvgMenu
					className={cn({
						[styles.disabled]: currentPage != 'Swap',
					})}
					type='swap'
				/>
			</li>
			<li
				onClick={goThird}
				className={cn({
					[styles.active]: currentPage == 'Buy',
				})}>
				<SvgMenu
					className={cn({
						[styles.disabled]: currentPage != 'Buy',
					})}
					type='buy'
				/>
			</li>
			<li
				onClick={goFourth}
				className={cn({
					[styles.active]: currentPage == 'Settings',
				})}>
				<SvgMenu
					className={cn({
						[styles.disabled]: currentPage != 'Settings',
					})}
					type='cog'
				/>
			</li>
		</ul>
	)
}
export default Menu
