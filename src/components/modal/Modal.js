import React from 'react'
import cn from 'classnames'
import styles from './modal.module.css'
import { useDispatch } from 'react-redux'
import Buttons from './../Buttons/Buttons'

const Modal = ({
	id,
	children,
	open,
	openFunc,
	padding = '30',
	white = false,
	closeIcon = false,
	closeOnBody = true,
	style
}) => {
	const dispatch = useDispatch()

	const close = (e) => {
		if (openFunc) {
			let target = e.target
			if (closeOnBody) {
				if (target && !target.closest('.' + styles.body)) {
					dispatch(openFunc((state) => !state))
				}
			}
		}
	}
	return (
		<div
			onClick={(e) => close(e)}
			className={cn(styles.modal, {
				[styles.active]: open == true,
				[styles.white]: white == true,
			})}
			id={id}>
			<div
				style={style}
				className={cn(white ? styles.white_body : styles.body, {
					[styles.padding30]: padding == '30',
					[styles.padding20]: padding == '20',
					[styles.padding0]: padding == '0',
				})}>
				{closeIcon ? (
					<Buttons type='close' className={styles.close}></Buttons>
				) : (
					<></>
				)}
				{children}
			</div>
		</div>
	)
}

export default Modal
