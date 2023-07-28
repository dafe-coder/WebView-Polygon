import React from 'react'
import cn from 'classnames'
import styles from './par.module.css'

const Par = ({ type = 'md', children, color }) => {
	return (
		<p
			className={cn(styles.title, {
				[styles.sm]: type == 'sm',
				[styles.md]: type == 'md',
				[styles.black]: color == 'black',
				[styles.dark_gray]: color == 'dark-gray',
				[styles.error]: type == 'error',
			})}>
			{children}
		</p>
	)
}

export default Par
