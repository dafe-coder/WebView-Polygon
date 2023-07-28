import React from 'react'
import Title from '../Title/Title'
import styles from './box-with-icon.module.css'
import Par from './../Par/Par'
import Lang from '../Lang/Lang'

const BoxWithIcon = ({ children, title, style, par, colorPar }) => {
	return (
		<div className={styles.box} style={style}>
			{children}
			<Title mb='0'>{title}</Title>
			{par ? (
				<Par color={colorPar}>
					<Lang eng='Version' cny='版本' /> {par}
				</Par>
			) : (
				<></>
			)}
		</div>
	)
}

export default BoxWithIcon
