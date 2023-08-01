import React from 'react'
import styles from './go-back.module.css'
import { useNavigate } from 'react-router-dom';

const GoBack = ({ fill }) => {
	const navigate = useNavigate()	

	return (
		<button onClick={() => navigate(-1)} className={styles.back}>
			<svg
				width='17'
				height='12'
				viewBox='0 0 17 12'
				fill={fill == 'white' ? '#FFFFFF' : '#4F33A3'}
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M1.28125 5.3125L5.28125 1.3125C5.65625 0.90625 6.3125 0.90625 6.6875 1.3125C7.09375 1.6875 7.09375 2.34375 6.6875 2.71875L4.40625 5H16C16.5312 5 17 5.46875 17 6C17 6.5625 16.5312 7 16 7H4.40625L6.6875 9.3125C7.09375 9.6875 7.09375 10.3438 6.6875 10.7188C6.3125 11.125 5.65625 11.125 5.28125 10.7188L1.28125 6.71875C0.875 6.34375 0.875 5.6875 1.28125 5.3125Z' />
			</svg>
		</button>
	)
}

export default GoBack
