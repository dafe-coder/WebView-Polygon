import React, { useState, useEffect } from 'react'
import styles from './assets-item.module.css'
import SwitchButton from './../SwitchButton/SwitchButton'

const AssetsItem = ({
	cryptoImg,
	cryptoName,
	onChooseAssets,
	id,
	currentActive,
}) => {
	const [chooseAssets, setChooseAssets] = useState(currentActive)

	const onChoose = () => {
		onChooseAssets(id)
		setChooseAssets(!chooseAssets)
	}

	return (
		<li className={styles.item}>
			<div className={styles.box}>
				<img className={styles.img} src={cryptoImg} alt={cryptoName} />
				<h5>{cryptoName}</h5>
			</div>
			<SwitchButton fucn={onChoose} check={chooseAssets} />
		</li>
	)
}

export default AssetsItem
