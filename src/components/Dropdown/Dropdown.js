import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import styles from './dropdown.module.css'
import Svg from '../../svgs/Svg'
import { logTimer } from './../../Func.wallet/logTimer'
import { setChooseTimeOut } from '../../store/slices/storageSlice'
import { useDispatch, useSelector } from 'react-redux'


const Dropdown = ({ dataDropdown, active, type }) => {
	const dispatch = useDispatch()
	const { lang } = useSelector((state) => state.storage)
	const [open, setOpen] = useState(false)
	const [current, setCurrent] = useState(null)

	const setLoginTimeOut = (value) => {
		dispatch(setChooseTimeOut(value))
	}

	React.useEffect(() => {
	console.log(current)
	}, [current])
	const onChoose = (e) => {
		const target = e.target
		target
			.closest('ul')
			.querySelectorAll('li')
			.forEach((item) => {
				item.classList.remove('active-time')
			})
		target.classList.add('active-time')
		target
			.closest('.' + styles.dropdown)
			.querySelector('button span').innerText = target.innerText
		setOpen(false)
		if (type == 'log-time-out') {
			let index = 0
			dataDropdown.filter((item, i) => {
				if (item.langWords.props[lang] === target.innerText) {
					index = i
				}
			})
			setLoginTimeOut(dataDropdown[index].value)
			logTimer(dataDropdown[index].value, dispatch)
			dispatch(setChooseTimeOut(dataDropdown[index].value))
		}
	}
	useEffect(() => {
		let index = 0
		dataDropdown.filter((item, i) => {
			if (item.value === active) {
				index = i
			}
		})
		setCurrent(dataDropdown[index])
	}, [active, dataDropdown])
	return (
		<div className={styles.dropdown}>
			<button className={styles.btn} onClick={() => setOpen(!open)}>
				<span>{current !== null ? current.langWords.props[lang] : ''}</span>
				<Svg type='arr-sm-right' />
			</button>
			<ul
				className={cn(styles.list, {
					[styles.open]: open == true,
				})}>
				{dataDropdown.map((item, i) => (
					<li
						key={i}
						onClick={(e) => onChoose(e)}
						className={item.value === active ? 'active-time' : ''}>
						{item.langWords}
					</li>
				))}
			</ul>
		</div>
	)
}
export default Dropdown
