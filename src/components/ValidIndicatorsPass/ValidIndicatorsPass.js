import React from 'react'
import SvgInput from './SvgValid'
import styles from './valid-indicators.module.css'
import Lang from '../Lang/Lang'
const ValidIndicatorsPass = ({
	numberValid,
	uppercaseValid,
	specCharValid,
	lengthValid,
}) => {
	return (
		<ul className={styles.validate}>
			<li>
				{uppercaseValid == true ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Uppercase' cny='大写' />}
			</li>
			<li className='check-special-char'>
				{specCharValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Special Chars' cny='特殊字符' />}
			</li>
			<li className='check-number'>
				{numberValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Number' cny='数字' />}
			</li>
			<li className='check-length'>
				{lengthValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Min 8 Symbols' cny='最少 8 个符号' />}
			</li>
		</ul>
	)
}

export default ValidIndicatorsPass
