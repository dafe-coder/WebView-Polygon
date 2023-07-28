import React from 'react'
import cn from 'classnames'
import styles from './title.module.css'

const Title = ({ type = 'md', color = 'primary', children, mb = '30', mt }) => {
	return (
		<h2
			className={cn(styles.title, {
				[styles.sm]: type == 'sm',
				[styles.md]: type == 'md',
				[styles.subtitle]: type == 'subtitle',
				[styles.success]: type == 'success',
				[styles.error]: type == 'error',
				[styles.error_sm]: type == 'error-sm',
				[styles.error_sm_alert]: type == 'error-sm-alert',
				[styles.dark]: color == 'dark',
				[styles.white]: color == 'white',
				[styles.primary]: color == 'primary',
				[styles.mt]: mt == true,
				[styles.m_0]: mb == '0',
				[styles.mt_30]: mt == '30',
				[styles.mb_20]: mb == '20',
				[styles.mb_30]: mb == '30',
			})}>
			{children}
		</h2>
	)
}

export default Title
