import React, { useState, useEffect, useRef } from 'react'
import Par from '../Par/Par'
import styles from './restore-count-words.module.css'
import cn from 'classnames'
import Lang from '../Lang/Lang'
import { useNavigate } from 'react-router-dom'

const RestoreCountWordsItem = ({ title, children, walletKey }) => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [height, setHeight] = useState(false)
	const [chooseBtn, setChooseBtn] = useState(false)
	const [chooseCountWordRestore, setChooseCountWordRestore] = React.useState(null)

	const ref = useRef(null)

	useEffect(() => {
		let height = ref.current.scrollHeight + 40 + 'px'
		setHeight(height)
	}, [isOpen])
	useEffect(() => {
		if (walletKey == chooseCountWordRestore) {
			setChooseBtn(true)
		} else {
			setChooseBtn(false)
		}
	}, [chooseCountWordRestore])
	const onChooseCountWord = () => {
		setChooseCountWordRestore(walletKey)
		navigate('/import-data', {state: {walletKey}})
	}

	return (
		<li>
			<button
				className={cn(styles.btn, {
					[styles.chooseBtn]: chooseBtn == true,
				})}
				onClick={onChooseCountWord}>
				<svg
					width='14'
					height='13'
					viewBox='0 0 14 13'
					fill='var(--primary)'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M12.4688 0.625C12.8242 0.625 13.125 0.925781 13.125 1.28125C13.125 1.66406 12.8242 1.9375 12.4688 1.9375H2.40625C1.77734 1.9375 1.3125 2.42969 1.3125 3.03125V10.4688C1.3125 11.0977 1.77734 11.5625 2.40625 11.5625H11.5938C12.1953 11.5625 12.6875 11.0977 12.6875 10.4688V5.65625C12.6875 5.05469 12.1953 4.5625 11.5938 4.5625H3.28125C2.89844 4.5625 2.625 4.28906 2.625 3.90625C2.625 3.55078 2.89844 3.25 3.28125 3.25H11.5938C12.9062 3.25 14 4.34375 14 5.65625V10.4688C14 11.8086 12.9062 12.875 11.5938 12.875H2.40625C1.06641 12.875 0 11.8086 0 10.4688V3.03125C0 1.71875 1.06641 0.625 2.40625 0.625H12.4688ZM9.625 8.0625C9.625 7.59766 10.0078 7.1875 10.5 7.1875C10.9648 7.1875 11.375 7.59766 11.375 8.0625C11.375 8.55469 10.9648 8.9375 10.5 8.9375C10.0078 8.9375 9.625 8.55469 9.625 8.0625Z' />
				</svg>
				{title}
			</button>
			<div
				className={cn(styles.collapse, {
					[styles.active]: isOpen == true,
				})}>
				<div
					ref={ref}
					style={isOpen ? { maxHeight: height } : { maxHeight: 0 }}
					className={cn(styles.collapse_body, {
						[styles.open_body]: isOpen == true,
					})}>
					<Par type='sm'>{children}</Par>
				</div>
				<a
					onClick={() => setIsOpen(!isOpen)}
					className={cn(styles.collapse_link, {
						[styles.active_link]: isOpen == true,
					})}>
					<span>
						<Lang eng='Learn More' cny='学到更多' />
					</span>
					<svg
						width='8'
						height='5'
						viewBox='0 0 8 5'
						fill='var(--primary)'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M7.57031 1.23438L4.46484 4.04688C4.34766 4.16406 4.17188 4.16406 4.05469 4.04688L0.910156 1.23438C0.773438 1.11719 0.773438 0.921875 0.890625 0.804688C1.00781 0.667969 1.20312 0.667969 1.32031 0.785156L4.25 3.40234L7.16016 0.785156C7.27734 0.667969 7.47266 0.667969 7.58984 0.804688C7.70703 0.921875 7.70703 1.11719 7.57031 1.23438Z' />
					</svg>
				</a>
			</div>
		</li>
	)
}

export default RestoreCountWordsItem
