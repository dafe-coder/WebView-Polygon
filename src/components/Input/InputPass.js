import React from 'react'
import { useState } from 'react'
import ValidIndicatorsPass from '../ValidIndicatorsPass/ValidIndicatorsPass'
import styles from './input.module.css'
import cn from 'classnames'
import ShowPass from './../ShowPass/ShowPass'
import {
	setPasswordInit,
	setPasswordMatch,
	setPasswordValid,
} from '../../store/slices/createSlice'
import { useDispatch, useSelector } from 'react-redux'

const InputPass = ({ id, label }) => {
	const dispatch = useDispatch()
	const { passwordCheck, passwordValid, passwordInit } = useSelector(
		(state) => state.create
	)
	const [uppercaseValid, setUppercaseValid] = useState(false)
	const [specCharValid, setSpecCharValid] = useState(false)
	const [numberValid, setNumberValid] = useState(false)
	const [lengthValid, setLengthValid] = useState(false)

	const checkPassValid = (value) => {
		if (value === passwordCheck) {
			dispatch(setPasswordMatch(true))
		} else {
			dispatch(setPasswordMatch(false))
		}
	}
	const onInputValidate = (e) => {
		let value = e.target.value
		let arrValue = value.split('')
		let letterUppercase = false
		let letterSpecialChars = false
		let number = false
		let length = false
		dispatch(setPasswordInit(value))
		checkPassValid(value)

		// Uppercase
		arrValue.forEach((letter) => {
			if (letter == letter.toUpperCase() && letter.match(/^[a-zA-Z]/)) {
				letterUppercase = true
			}
		})
		if (letterUppercase) {
			setUppercaseValid(true)
		} else {
			setUppercaseValid(false)
		}
		//SpecialChar
		if (value.match(/[!@#$&*%]/)) {
			setSpecCharValid(true)
			letterSpecialChars = true
		} else {
			setSpecCharValid(false)
		}
		//number
		if (value.match(/\d/)) {
			setNumberValid(true)
			number = true
		} else {
			setNumberValid(false)
		}
		//length
		if (value.length >= 8) {
			setLengthValid(true)
			length = true
		} else {
			setLengthValid(false)
		}
		if (letterUppercase && letterSpecialChars && number && length) {
			dispatch(setPasswordValid(true))
		} else {
			dispatch(setPasswordValid(false))
		}
	}
	return (
		<div className={styles.wallet_input}>
			<div className='pos-r'>
				<ShowPass walletInput={styles.wallet_input} />
				<input
					onInput={(e) => onInputValidate(e)}
					className={cn('input', {
						[styles.success]: passwordValid == true,
						[styles.warning]: passwordValid == false,
					})}
					value={passwordInit}
					type='password'
					id={id}
					name='name'
					required={true}
				/>
				<label className='label' htmlFor={id}>
					{label}
				</label>
			</div>
			<ValidIndicatorsPass
				lengthValid={lengthValid}
				numberValid={numberValid}
				specCharValid={specCharValid}
				uppercaseValid={uppercaseValid}
			/>
		</div>
	)
}

export default InputPass
