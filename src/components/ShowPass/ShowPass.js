import React from 'react'
import styles from './show-pass.module.css'
import SvgShowPass from './SvgShowPass'

const ShowPass = ({ walletInput }) => {
	function onShowPass(e) {
		e.preventDefault()

		if (e.target.closest('.' + walletInput).classList.contains('active')) {
			e.target.closest('.' + walletInput).classList.remove('active')
			e.target
				.closest('.' + walletInput)
				.querySelector('.eye')
				.classList.remove('d-none')
			e.target
				.closest('.' + walletInput)
				.querySelector('.eye-filled')
				.classList.add('d-none')
			e.target
				.closest('.' + walletInput)
				.querySelector('input')
				.setAttribute('type', 'password')
		} else {
			e.target.closest('.' + walletInput).classList.add('active')
			e.target
				.closest('.' + walletInput)
				.querySelector('.eye')
				.classList.add('d-none')
			e.target
				.closest('.' + walletInput)
				.querySelector('.eye-filled')
				.classList.remove('d-none')
			e.target
				.closest('.' + walletInput)
				.querySelector('input')
				.setAttribute('type', 'text')
		}
	}
	return (
		<button className={styles.show_pass} onClick={(e) => onShowPass(e)}>
			<SvgShowPass type='eye' className='eye' />
			<SvgShowPass type='eye-filled' className='eye-filled d-none' />
		</button>
	)
}

export default ShowPass
