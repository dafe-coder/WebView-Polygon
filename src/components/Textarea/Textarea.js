import React from 'react'
import { useState } from 'react'
import Par from '../Par/Par'
import styles from './textarea.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import {
	setRestorePhrase,
	setRestorePhraseValid,
} from '../../store/slices/createSlice.js'

const Textarea = ({ id, label, errorPar, getAddress, countWords }) => {
	const {restorePhrase, restorePhraseValid} = useSelector(state => state.create)
	const [marginInput, setMarginInput] = useState(null)
	const [phraseBoolean, setPhraseBoolean] = useState(restorePhraseValid)
	const [value, setValue] = useState(restorePhrase)
	const dispatch = useDispatch()

	function onBlur(value) {
		if (value.length > 0) {
			setMarginInput(true)
		} else {
			setMarginInput(false)
		}
	}
	const onNameValidate = (e) => {
		let phrase = e.target.value
		let phraseArr = phrase.trim().split(' ')
		const length = phraseArr.length
		setValue(phrase)
		dispatch(setRestorePhrase(phrase))
		if (length === 12 || length === 15 || length === 18 || length === 21 || length === 24) {
			dispatch(setRestorePhraseValid(true))
			setPhraseBoolean(true)
			getAddress(phrase)
		} else if (
			length == 1 &&
			length != 0 &&
			phrase.length === 64
		) {
			dispatch(setRestorePhraseValid(true))
			setPhraseBoolean(true)
			getAddress(phrase)
		} else {
			dispatch(setRestorePhraseValid(false))
			setPhraseBoolean(false)
		}
	}
	return (
		<div
			className={styles.wallet_input}
			style={
				marginInput || value.length >= 1
					? { marginTop: '40px' }
					: { marginTop: 0 }
			}>
			<textarea
				onInput={(e) => onNameValidate(e)}
				onFocus={() => setMarginInput(true)}
				onBlur={() => onBlur(value)}
				className={cn(styles.textarea, {
					[styles.success]: phraseBoolean == true,
					[styles.error]: phraseBoolean == false,
				})}
				type='text'
				id={id}
				phrase='phrase'
				required={true}
				value={value}></textarea>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			{errorPar ? (
				phraseBoolean == false ? (
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

export default Textarea
