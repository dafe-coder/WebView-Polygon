import React from 'react';
import SvgInput from './SvgValid';
import styles from './valid-indicators.module.css';
import Lang from '../Lang/Lang';
import cn from 'classnames';

const ValidIndicatorsPass = ({
	numberValid,
	uppercaseValid,
	specCharValid,
	lengthValid,
}) => {
	return (
		<ul className={styles.validate}>
			<li className={cn({ [styles.activeLink]: uppercaseValid })}>
				{uppercaseValid == true ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Uppercase' cny='大写' />}
			</li>
			<li
				className={cn('check-special-char', {
					[styles.activeLink]: uppercaseValid,
				})}
			>
				{specCharValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Special Chars' cny='特殊字符' />}
			</li>
			<li
				className={cn('check-number', { [styles.activeLink]: uppercaseValid })}
			>
				{numberValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Number' cny='数字' />}
			</li>
			<li
				className={cn('check-length', { [styles.activeLink]: uppercaseValid })}
			>
				{lengthValid ? (
					<SvgInput type='circle-filled' />
				) : (
					<SvgInput type='circle' />
				)}
				{<Lang eng='Min 8 Symbols' cny='最少 8 个符号' />}
			</li>
		</ul>
	);
};

export default ValidIndicatorsPass;
