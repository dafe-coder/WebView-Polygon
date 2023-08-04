import React, { useState, useEffect } from 'react'
import LangChoose from '../../components/LangChoose/LangChoose'
import styles from './main.module.css'
import cn from 'classnames'
import Button from '../../components/Button/Button'
import Lang from '../../components/Lang/Lang'

export const Start = () => {
	return (
		<section className={cn(styles.section)}>
			<LangChoose />
			<div className='btn-list-row'>
				<Button
					type='primary'
					to='/create-data'>
					<svg
						className='btn-svg'
						width='16'
						height='14'
						viewBox='0 0 16 14'
						fill='#009393'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M14.25 0C14.6562 0 15 0.34375 15 0.75C15 1.1875 14.6562 1.5 14.25 1.5H2.75C2.03125 1.5 1.5 2.0625 1.5 2.75V11.25C1.5 11.9688 2.03125 12.5 2.75 12.5H13.25C13.9375 12.5 14.5 11.9688 14.5 11.25V5.75C14.5 5.0625 13.9375 4.5 13.25 4.5H3.75C3.3125 4.5 3 4.1875 3 3.75C3 3.34375 3.3125 3 3.75 3H13.25C14.75 3 16 4.25 16 5.75V11.25C16 12.7812 14.75 14 13.25 14H2.75C1.21875 14 0 12.7812 0 11.25V2.75C0 1.25 1.21875 0 2.75 0H14.25ZM11 8.5C11 7.96875 11.4375 7.5 12 7.5C12.5312 7.5 13 7.96875 13 8.5C13 9.0625 12.5312 9.5 12 9.5C11.4375 9.5 11 9.0625 11 8.5Z' />
					</svg>
					<Lang eng='Create Wallet' cny='创建钱包' />
				</Button>
				<Button
					mt='0'
					type='border-primary'
					to='/import'>
					<svg
						className='btn-svg'
						width='15'
						height='15'
						viewBox='0 0 15 15'
						fill='#009393'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M14.5 1.25V6.25C14.5 6.6875 14.1562 7 13.75 7H8.75C8.3125 7 8 6.6875 8 6.25C8 5.84375 8.3125 5.5 8.75 5.5H11.875C10.9375 3.71875 9.0625 2.5 7 2.5C3.9375 2.5 1.5 4.96875 1.5 8C1.5 11.0625 3.9375 13.5 7 13.5C8.28125 13.5 9.53125 13.0625 10.5 12.25C10.8125 11.9688 11.2812 12.0312 11.5625 12.3438C11.8125 12.6562 11.7812 13.125 11.4688 13.4062C10.2188 14.4375 8.625 15 6.96875 15C3.125 15 0 11.875 0 8C0 4.15625 3.125 1.03125 6.96875 1.03125C9.46875 1.03125 11.75 2.375 13 4.4375V1.25C13 0.84375 13.3125 0.5 13.75 0.5C14.1562 0.5 14.5 0.84375 14.5 1.25Z' />
					</svg>
					<Lang eng='Restore wallet' cny='恢复钱包' />
				</Button>
			</div>
		</section>
	)
}
