import React, { useState, useEffect } from 'react'
import styles from './assets-item.module.css'
import SwitchButton from './../SwitchButton/SwitchButton'

const AssetsItem = ({
	cryptoImg,
	cryptoName,
	onChooseAssets,
	symbol,
	currentActive,
}) => {
	const onChoose = () => {
		onChooseAssets(symbol)
	}

	return (
		<li className={styles.item}>
			<div className={styles.box}>
				<img className={styles.img} src={cryptoImg} alt={cryptoName} />
				<h5>{cryptoName}</h5>
			</div>
			<SwitchButton func={onChoose} check={currentActive} />
		</li>
	)
}

export default AssetsItem
