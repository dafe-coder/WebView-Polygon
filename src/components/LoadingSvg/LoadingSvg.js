import React, { useEffect } from 'react';
import styles from './loading.module.css';
import { useAnimatedText } from '../../hooks/useAnimText.hook';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import LogoIcon from '../../static/assets/images/logo.png';
import { setPlayAnimWallet } from '../../store/slices/walletSlice';
import { useNavigate } from 'react-router-dom';

const AnimatedText = ({ text }) => {
	const currentText = useAnimatedText(text, 400);
	return currentText;
};

const LoadingSvg = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { playAnimWallet } = useSelector((state) => state.wallet);
	const [goHome, setGoHome] = React.useState(false);

	React.useEffect(() => {
		goHome && navigate('/wallet');
	}, [goHome]);

	useEffect(() => {
		let timer;
		if (playAnimWallet) {
			timer = setTimeout(() => {
				dispatch(setPlayAnimWallet(false));
				setGoHome(true);
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
				<img
					width={150}
					height={150}
					className={styles.logoIcon}
					src={LogoIcon}
				/>
			</div>
		</div>
	);
};
export default LoadingSvg;
