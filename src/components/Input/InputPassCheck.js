import React from 'react'
import Par from '../Par/Par'
import cn from 'classnames'
import ShowPass from '../ShowPass/ShowPass'
import styles from './input.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordMatch, setPasswordCheck } from '../../store/slices/createSlice'

const InputPassCheck = ({ id, label, errorPar }) => {
	const dispatch = useDispatch()
	const { passwordMatch, passwordInit, passwordCheck } = useSelector(
		(state) => state.create
	)

	const checkPassValid = (value) => {
		if (passwordInit === value) {
			dispatch(setPasswordMatch(true))
		} else {
			dispatch(setPasswordMatch(false))
		}
	}

	const onPassCheckValidate = (e) => {
		let value = e.target.value
		dispatch(setPasswordCheck(value))
		checkPassValid(value)
	}
	return (
		<div className={styles.wallet_input}>
			<div className='pos-r'>
				<ShowPass walletInput={styles.wallet_input} />
				<input
					onInput={(e) => onPassCheckValidate(e)}
					className={cn('input', {
						[styles.success]: passwordMatch == true,
						[styles.error]: passwordMatch == false,
					})}
					type='password'
					id={id}
					name='name'
					required={true}
					value={passwordCheck}
				/>
				<label className='label' htmlFor={id}>
					{label}
				</label>
			</div>
			{errorPar ? (
				passwordMatch == false ? (
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

export default InputPassCheck
