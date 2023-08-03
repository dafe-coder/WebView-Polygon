import React from 'react'
import cn from 'classnames'
import styles from './par.module.css'

const Par = ({ type = 'md', children, color, m, mb }) => {
	return (
		<p
			style={{marginBottom: mb}}
			className={cn(styles.title, {
				[styles.sm]: type == 'sm',
				[styles.md]: type == 'md',
				[styles.black]: color == 'black',
				[styles.black]: color == 'black',
				[styles.white]: color == 'white',
				[styles.dark_gray]: color == 'dark-gray',
				[styles.error]: type == 'error',
				[styles.m0]: m == 0,
			})}>
			{children}
		</p>
	)
}

export default Par
