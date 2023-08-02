import React, { useState } from 'react'
import Par from '../Par/Par'
import styles from './input.module.css'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { setNameValid, setName } from '../../store/slices/createSlice'

const InputName = ({ id, label, errorPar }) => {
	const {dataUser} = useSelector(state => state.storage)
	const { nameValid, name } = useSelector((state) => state.create)
	const [errorName, setErrorName] = useState(false)
	const dispatch = useDispatch()

	const onNameValidate = (e) => {
		let name = e.target.value
		dispatch(setName(name))
		if (name.length > 1 && name.length <= 40) {
			if (dataUser !== null && dataUser.length >= 1) {
				let arrNames = dataUser.map((item) => {
					return item.name
				})
				if (!arrNames.includes(name)) {
					dispatch(setNameValid(true))
					setErrorName(true)
				} else {
					setErrorName(false)
					dispatch(setNameValid(false))
				}
			} else {
				dispatch(setNameValid(true))
			}
		} else {
			dispatch(setNameValid(false))
		}
	}
	return (
		<div className={styles.wallet_input}>
			<input
				onChange={(e) => onNameValidate(e)}
				className={cn('input', {
					[styles.success]: nameValid == true,
					[styles.error]: nameValid == false,
				})}
				type='text'
				id={id}
				name='name'
				required={true}
				value={name}
			/>
			<label className='label' htmlFor={id}>
				{label}
			</label>
			{errorPar ? (
				nameValid == false ? (
					<Par type='error'>
						{errorName ? errorPar : 'This wallet name already exists'}
					</Par>
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	)
}

export default InputName
