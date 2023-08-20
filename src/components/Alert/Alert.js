import React from 'react'
import styles from './alert.module.css'
import Par from '../Par/Par'
import Title from './../Title/Title'
import cn from 'classnames'

const Alert = ({ children, danger = false, title, icon = false, style }) => {
	return (
		<div
			style={style}
			className={cn(styles.alert, {
				[styles.danger]: danger == true,
			})}>
			{icon ? (
				<Title type='error-sm-alert' mb='0'>
					<svg
						className={styles.icon}
						width='16'
						height='13'
						viewBox='0 0 16 13'
						fill='#F04848'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8 9.59375C7.61719 9.59375 7.34375 9.89453 7.34375 10.25C7.34375 10.6328 7.64453 10.9062 8 10.9062C8.35547 10.9062 8.62891 10.6328 8.62891 10.25C8.65625 9.89453 8.35547 9.59375 8 9.59375ZM8 8.5C8.21875 8.5 8.41016 8.30859 8.41016 8.0625V4.125C8.41016 3.90625 8.19141 3.6875 8 3.6875C7.78125 3.6875 7.5625 3.90625 7.5625 4.125V8.0625C7.5625 8.30859 7.75391 8.5 8 8.5ZM14.7812 10.6328L9.3125 1.39062C9.03906 0.925781 8.54688 0.652344 8 0.625C7.42578 0.625 6.93359 0.925781 6.66016 1.39062L1.19141 10.6328C0.917969 11.0977 0.917969 11.6445 1.19141 12.1094C1.46484 12.6016 1.95703 12.875 2.53125 12.875H13.4688C14.0156 12.875 14.5078 12.6016 14.7812 12.1094C15.0547 11.6445 15.0547 11.0977 14.7812 10.6328ZM14.0156 11.6719C13.9062 11.8906 13.6875 12 13.4414 12H2.53125C2.28516 12 2.06641 11.8906 1.95703 11.6719C1.82031 11.4805 1.84766 11.2617 1.95703 11.0703L7.42578 1.82812C7.53516 1.63672 7.75391 1.5 8 1.5C8 1.5 7.97266 1.5 8 1.5C8.21875 1.52734 8.4375 1.63672 8.54688 1.82812L14.0156 11.0703C14.125 11.2617 14.1523 11.4805 14.0156 11.6719Z' />
					</svg>
					{title}
				</Title>
			) : (
				<Title type='error-sm-alert' mb='0'>
					{title}
				</Title>
			)}
			<Par type='sm' style={{ marginBottom: 0 }}>
				{children}
			</Par>
		</div>
	)
}

export default Alert
