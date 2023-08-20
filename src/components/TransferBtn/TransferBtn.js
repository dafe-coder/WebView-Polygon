import React from 'react'
import cn from 'classnames'
import styles from './transfer-btn.module.css'

const TransferBtn = ({ type, children, onClick, style }) => {
	switch (type) {
		case 'send':
			return (
				<button
					style={style}
					onClick={onClick}
					className={cn(styles.btn, styles.send)}>
					<svg
						width='8'
						height='9'
						viewBox='0 0 8 9'
						fill='#4C9540'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M8 0.425V6.375C8 6.61406 7.80031 6.8 7.60062 6.8C7.37598 6.8 7.20125 6.61406 7.20125 6.375V1.46094L0.686427 8.39375C0.611544 8.47344 0.5117 8.5 0.411856 8.5C0.287051 8.5 0.187207 8.47344 0.112324 8.39375C-0.0374415 8.23438 -0.0374415 7.94219 0.112324 7.78281L6.62715 0.85H1.9844C1.78471 0.85 1.58502 0.6375 1.60998 0.425C1.60998 0.185937 1.78471 0 2.00936 0H7.60062C7.80031 0 8 0.2125 8 0.425Z' />
					</svg>
					{children}
				</button>
			)
		case 'receive':
			return (
				<button
					style={style}
					onClick={onClick}
					className={cn(styles.btn, styles.receive)}>
					<svg
						width='8'
						height='9'
						viewBox='0 0 8 9'
						fill='#4C9540'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M0 8.075V2.125C0 1.88594 0.199688 1.7 0.399376 1.7C0.624025 1.7 0.798752 1.88594 0.798752 2.125V7.03906L7.31357 0.10625C7.38846 0.0265627 7.4883 0 7.58814 0C7.71295 0 7.81279 0.0265627 7.88768 0.10625C8.03744 0.265625 8.03744 0.557813 7.88768 0.717187L1.37285 7.65H6.0156C6.21529 7.65 6.41498 7.8625 6.39002 8.075C6.39002 8.31406 6.21529 8.5 5.99064 8.5H0.399376C0.199688 8.5 0 8.2875 0 8.075Z' />
					</svg>
					{children}
				</button>
			)
		default:
			return <></>
	}
}

export default TransferBtn
