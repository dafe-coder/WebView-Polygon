import React, { useEffect, useState } from 'react';
import styles from './loading.module.css';
import { useAnimatedText } from '../../hooks/useAnimText.hook';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayAnimWallet } from '../../actions/wallet';
import LogoIcon from './shiba.png';

const AnimatedText = ({ text }) => {
	const currentText = useAnimatedText(text, 400);
	return currentText;
};
const LoadingSvg = () => {
	const dispatch = useDispatch();
	const { playAnimWallet } = useSelector((state) => state.wallet);
	useEffect(() => {
		let timer;
		if (playAnimWallet) {
			timer = setTimeout(() => {
				dispatch(setPlayAnimWallet(false));
			}, 2000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [playAnimWallet]);
	return (
		<div
			className={cn(styles.loading_page, {
				[styles.active]: playAnimWallet,
			})}
		>
			<h4 className={styles.title}>
				Loading
				<AnimatedText text='....' />
			</h4>
			<div className={styles.dog}>
				<img className={styles.logoIcon} src={LogoIcon} />
			</div>
		</div>
	);
};
export default LoadingSvg;
