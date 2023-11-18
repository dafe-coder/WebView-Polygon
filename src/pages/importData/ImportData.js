import React from 'react';
import cn from 'classnames';
import Title from '../../components/Title/Title';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import Button from '../../components/Button/Button';
import Textarea from '../../components/Textarea/Textarea';
import Par from '../../components/Par/Par';
import Input from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import generateAddressesFromSeed from '../../Func.wallet/generateAddress';
import CryptoJS from 'crypto-js';
import {
	setData,
	setCurrentAccount,
	setIsLogin,
} from '../../store/slices/storageSlice';
import { setRegistered } from '../../store/slices/createSlice';

export const ImportData = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { password } = useSelector((state) => state.storage);
	const { restorePhraseValid, nameValid, name, registered } = useSelector(
		(state) => state.create
	);
	const [disabledBtn, setDisabledBtn] = React.useState(true);
	const [privateKey, setPrivateKey] = React.useState('');
	const [restorePhrase, setRestorePhrase] = React.useState('');

	React.useEffect(() => {
		if (nameValid && restorePhraseValid) {
			setDisabledBtn(false);
		} else {
			setDisabledBtn(true);
		}
	}, [nameValid, restorePhraseValid]);

	const getAddress = (phrase) => {
		const length = phrase.split(' ').length;
		if (
			length === 12 ||
			length === 15 ||
			length === 18 ||
			length === 21 ||
			length === 24
		) {
			const result = generateAddressesFromSeed(phrase, length);
			setPrivateKey(result);
			setRestorePhrase(phrase);
		} else {
			setPrivateKey(phrase);
			setRestorePhrase('');
		}
	};

	const onAddNewAcc = () => {
		if (!disabledBtn) {
			if (!registered) {
				const kitkat = 'aBN6qreLALR9QYPy';

				let phraseCrypt =
					restorePhrase != ''
						? CryptoJS.AES.encrypt(restorePhrase, kitkat).toString()
						: '';
				let privateKeyCrypt = CryptoJS.AES.encrypt(
					privateKey,
					kitkat
				).toString();
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
				dispatch(setCurrentAccount(name));
				dispatch(setIsLogin(true));
			}
			if (password !== '') {
				navigate('/import-end');
			} else {
				navigate('/create-pass', { state: { to: '/import-end' } });
			}
		}
	};

	return (
		<section className={cn('bg-white')}>
			<GoBack goTo='WalletRestore' />
			<Title mt>
				<Lang eng='Create Wallet' cny='创建钱包' />
			</Title>
			<div className='wallet_body'>
				<div>
					<Par color='primary'>
						Recover a wallet using your Secret Recovery Phrase.
					</Par>
					<Input errorPar id='name' type='normal' label='Name' />
					<Textarea
						getAddress={getAddress}
						label='Recovery phrase / private key'
					/>
				</div>
			</div>
			<Button
				className={disabledBtn && 'disabled'}
				type='primary'
				onClick={onAddNewAcc}
			>
				Import Wallet
			</Button>
		</section>
	);
};
