import React from 'react'
import cn from 'classnames'
import styles from './buttons.module.css'
import Svg from '../../svgs/Svg'

const Buttons = ({ type, children, className = '', onClick }) => {
	const onAddClick = () => {
		if (onClick) {
			onClick()
		}
	}
	switch (type) {
		case 'lock':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_lock, className)}>
					<Svg type='lock' />
					{children}
				</button>
			)
		case 'cog':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_header, className)}>
					<Svg type='cog-big' />
					{children}
				</button>
			)
		case 'back':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_header, className)}>
					<Svg type='arr-long' />
					{children}
				</button>
			)
		case 'sm-primary':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.sm_primary, styles.btn, className)}>
					{children}
				</button>
			)
		case 'notification':
			return (
				<button
					onClick={onAddClick}
					className={cn(
						styles.btn,
						styles.btn_hist,
						styles.btn_header,
						className
					)}>
					<Svg type='clock-sm' />
					{children}
				</button>
			)
		case 'settings':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_header, className)}>
					<Svg type='settings' />
					{children}
				</button>
			)
		case 'account':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_header, className)}>
					<Svg type='account' />
					{children}
				</button>
			)
		case 'close':
			return (
				<button
					onClick={onAddClick}
					className={cn(styles.btn, styles.btn_header, className)}>
					<Svg type='close' />
					{children}
				</button>
			)
		case 'copy':
			return (
				<button onClick={onAddClick} className={cn(styles.btn, className)}>
					<Svg type='copy' />
					{children}
				</button>
			)
		default:
			return <></>
	}
}
export default Buttons
