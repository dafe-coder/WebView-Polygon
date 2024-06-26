import React from 'react'
import cn from 'classnames'
import styles from './button.module.css'
import { useNavigate } from 'react-router-dom'

const Button = ({
	type,
	children,
	className,
	id = null,
	onClick,
	arrow = false,
	positionSvg,
	style,
	mb = false,
	mt = '',
	text,
	to = ''
}) => {
	const navigate = useNavigate()

	function onClickFunc() {
		if(to !== '') {
			navigate(to)
		} else if (onClick) {
			onClick()
		} else {
			return
		}
	}
	
	return (
		<button
			style={style}
			type='button'
			onClick={onClickFunc}
			id={id}
			className={cn('btn', styles.btn, className, {
				[styles.transparent]: type == 'transparent',
				[styles.white]: type == 'white',
				[styles.primary]: type == 'primary',
				[styles.svg_right]: positionSvg == 'right',
				[styles.svg_left]: positionSvg == 'left',
				[styles.border_primary]: type == 'border-primary',
				[styles.border_gray]: type == 'border-gray',
				[styles.border_error]: type == 'border-error',
				[styles.mb]: mb == true,
				[styles.mt]: mt == true,
				[styles.mt_0]: mt == '0',
				[styles.text_left]: text == 'left',
				[styles.text_between]: text == 'between',
			})}>
			{children}
			{arrow ? (
				<svg
					className={styles.arrow}
					width='15'
					height='10'
					viewBox='0 0 15 10'
					fill='white'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M9.66016 8.93359C9.52344 8.82422 9.46875 8.66016 9.46875 8.46875C9.46875 8.30469 9.52344 8.14062 9.66016 8.03125L12.2578 5.40625H1.15625C0.773438 5.40625 0.5 5.13281 0.5 4.75C0.5 4.39453 0.773438 4.09375 1.15625 4.09375H12.2578L9.66016 1.49609C9.38672 1.25 9.38672 0.839844 9.66016 0.59375C9.90625 0.320312 10.3164 0.320312 10.5898 0.59375L14.3086 4.3125C14.5547 4.55859 14.5547 4.96875 14.3086 5.21484L10.5898 8.93359C10.3164 9.20703 9.90625 9.20703 9.66016 8.93359Z' />
				</svg>
			) : (
				<></>
			)}
		</button>
	)
}

export default Button
