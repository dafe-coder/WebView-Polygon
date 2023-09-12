import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Textarea from './../Textarea/Textarea';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import generateAddressesFromSeed from '../../Func.wallet/generateAddress';
import Lang from '../Lang/Lang';
import CryptoJS from 'crypto-js';
import {
	setPasswordCheck,
	setPasswordMatch,
	setPasswordValid,
	setName,
	setNameValid,
	resetCreate,
} from '../../store/slices/createSlice';
import {
	setData,
	setPassword,
	setCurrentAccount,
	setIsLogin,
} from '../../store/slices/storageSlice';
import { useNavigate } from 'react-router-dom';

const Form = ({ countWords }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		passwordValid,
		passwordMatch,
		nameValid,
		name,
		passwordInit,
		restorePhraseValid,
	} = useSelector((state) => state.create);
	const [privateKey, setPrivateKey] = React.useState('');
	const [restorePhrase, setRestorePhrase] = React.useState('');

	const [activeButton, setActiveButton] = useState(false);

	useEffect(() => {
		if (passwordValid && passwordMatch && nameValid && restorePhraseValid) {
			setActiveButton(true);
		} else {
			setActiveButton(false);
		}
	}, [passwordValid, passwordMatch, nameValid, restorePhraseValid]);

	const getAddress = (phrase) => {
		if (countWords != 'own') {
			const result = generateAddressesFromSeed(phrase, countWords);
			setPrivateKey(result);
			setRestorePhrase(phrase);
		} else {
			setPrivateKey(phrase);
			setRestorePhrase('');
		}
	};

	const submitForm = () => {
		if (passwordValid && passwordMatch && nameValid && restorePhraseValid) {
			const kitkat = process.env.REACT_APP_KEY;

			let phraseCrypt =
				restorePhrase != ''
					? CryptoJS.AES.encrypt(restorePhrase, kitkat).toString()
					: '';
			let privateKeyCrypt = CryptoJS.AES.encrypt(privateKey, kitkat).toString();
			const newDataUser = {
				name,
				phrase: phraseCrypt,
				privateKey: privateKeyCrypt,
				address: '',
				chooseAssets: [
					'ethereum',
					'usd-coin',
					'matic-network',
					'wrapped-bitcoin',
				],
			};
			dispatch(setData(newDataUser));
			dispatch(setPassword(passwordInit));
			dispatch(setCurrentAccount(name));
			dispatch(setIsLogin(true));
			dispatch(resetCreate());
			navigate('/import-end');
		} else {
		}
	};
	return (
		<form action='#' className='wallet_form'>
			<div className='create-wallet_info'>
				<Input
					id='input-name'
					label={<Lang eng='Wallet Name' cny='钱包名称' />}
					errorPar={
						<Lang
							eng='Wallet name requires at least 1 and at most 40 letters'
							cny='钱包名称至少需要 1 个字母，最多 40 个字母'
						/>
					}
				/>
				<Textarea
					countWords={countWords}
					getAddress={getAddress}
					id='input-phrase'
					label={
						<Lang eng='Recovery phrase / private key' cny='恢复短语/私钥' />
					}
				/>
				<Input
					id='input-password'
					label={<Lang eng='Spending password' cny='消费密码' />}
					type='password'
				/>
				<Input
					id='confirm-password'
					label={<Lang eng='Repeat password' cny='重复输入密码' />}
					type='password-check'
					errorPar={<Lang eng='Passwords doesn’t match!' cny='密码不匹配！' />}
				/>
			</div>
			<Button
				type='white'
				className={cn({ ['disabled']: activeButton == false })}
				onClick={submitForm}
				positionSvg='left'
			>
				<svg
					width='15'
					height='15'
					viewBox='0 0 15 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M14.5 1.25V6.25C14.5 6.6875 14.1562 7 13.75 7H8.75C8.3125 7 8 6.6875 8 6.25C8 5.84375 8.3125 5.5 8.75 5.5H11.875C10.9375 3.71875 9.0625 2.5 7 2.5C3.9375 2.5 1.5 4.96875 1.5 8C1.5 11.0625 3.9375 13.5 7 13.5C8.28125 13.5 9.53125 13.0625 10.5 12.25C10.8125 11.9688 11.2812 12.0312 11.5625 12.3438C11.8125 12.6562 11.7812 13.125 11.4688 13.4062C10.2188 14.4375 8.625 15 6.96875 15C3.125 15 0 11.875 0 8C0 4.15625 3.125 1.03125 6.96875 1.03125C9.46875 1.03125 11.75 2.375 13 4.4375V1.25C13 0.84375 13.3125 0.5 13.75 0.5C14.1562 0.5 14.5 0.84375 14.5 1.25Z'
						fill='#0D0F16'
					/>
				</svg>
				<Lang eng='Create Personal wallet' cny='创建个人钱包' />
			</Button>
		</form>
	);
};

export default Form;
