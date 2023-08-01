import React from 'react'
import styles from './switch-button.module.css'

const SwitchButton = ({ func, check = false }) => {
	return (
		<label className={styles.switch}>
			<input
				className={styles.input}
				type='checkbox'
				defaultChecked={check}
				onChange={func}
			/>
			<span className={styles.slider}></span>
		</label>
	)
}

export default SwitchButton
