import React from 'react'
import Par from '../Par/Par'
import cn from 'classnames'
import ShowPass from '../ShowPass/ShowPass'
import styles from './input.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {setPasswordInit} from '../../store/slices/createSlice'

const InputPassLog = ({ id, label, errorPar, noAnim }) => {
	const dispatch = useDispatch()
	const { passwordInit } = useSelector((state) => state.create)
	
	return (
		<div className={styles.wallet_input}>
			<ShowPass walletInput={styles.wallet_input} />
			<input
				onChange={(e) => dispatch(setPasswordInit(e.target.value))}
				className={cn('input', {
					[styles.no_label]: noAnim,
				})}
				type='password'
				id={id}
				name='pass'
				required={true}
				value={passwordInit}
			/>
			<label
				className={cn('label', {
					[styles.no_label]: noAnim,
				})}
				htmlFor={id}>
				{label}
			</label>
			{errorPar ? (
				passwordInit == false ? (
					<Par type='error'>{errorPar}</Par>
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	)
}

export default InputPassLog
