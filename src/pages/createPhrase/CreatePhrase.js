import React from 'react';
import cn from 'classnames';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import PhraseBox from '../../components/PhraseBox/PhraseBox';
import Par from '../../components/Par/Par';
import Alert from '../../components/Alert/Alert';
import Modal from '../../components/modal/Modal';
import QRCode from 'react-qr-code';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import { useNavigate } from 'react-router-dom';
import {
	resetWallet,
	setCurrentAccount,
	setData,
	setIsLogin,
} from '../../store/slices/storageSlice';
import { setDataWallet, setWalletNew } from '../../store/slices/walletSlice';
import { logTimer } from '../../Func.wallet/logTimer';
import generatePrivateKeyFromSeed from '../../Func.wallet/generateAddress';
import CryptoJS from 'crypto-js';
import { setRegistered } from '../../store/slices/createSlice';

const kitkat = 'Qsx@ah&OR82WX9T6gCt';

export const CreatePhrase = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openQr, setOpenQr] = useState(false);
	const { name, phrase, registered } = useSelector((state) => state.create);

	const goToVereficatePhrase = () => {
		if (!registered) {
			dispatch(setWalletNew(true));
			dispatch(setDataWallet(null));
			dispatch(resetWallet());
			logTimer('30 minutes', dispatch);
			const privateKey = generatePrivateKeyFromSeed(phrase, 12);
			let phraseCrypt =
				phrase != '' ? CryptoJS.AES.encrypt(phrase, kitkat).toString() : '';
			let privateKeyCrypt = CryptoJS.AES.encrypt(privateKey, kitkat).toString();
			const newDataUser = {
				name: name,
				phrase: phraseCrypt,
				address: '',
				privateKey: privateKeyCrypt,
			};
			dispatch(setData(newDataUser));
			dispatch(setCurrentAccount(name));
			dispatch(setIsLogin(true));
			dispatch(setRegistered(true));
		}
		navigate('/create-pass', { state: { to: '/wallet' } });
	};

	return (
		<section className={cn('bg-white')}>
			<GoBack goTo='WalletBackup' />
			<Title mt>
				<Lang eng='Back Up Wallet' cny='备份钱包' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<PhraseBox setOpenQr={setOpenQr} />
					<Par>
						<Lang
							eng='Be sure to back up the mnemonic phrase of your wallet, as it will be
						the only way to recover your assets under all circumstances.'
							cny='请务必备份钱包的助记词，因为这将是在任何情况下恢复您的资产的唯一方法。'
						/>
					</Par>
				</div>
				<div className='wallet_body__bottom'>
					<Alert
						title={
							<Lang eng='Keep Mnemonic Phrase Safe!' cny='保持助记词安全！' />
						}
						danger={true}
					>
						<Lang
							eng='Anyone with your mnemonic can access your wallet assets. Please back
						up your mnemonic before you receive transfers or delete the app.'
							cny='任何拥有您助记词的人都可以访问您的钱包资产。 请在收到转账或删除应用程序之前备份您的助记词。'
						/>
					</Alert>
					<Button
						onClick={goToVereficatePhrase}
						type='primary'
						id='confirm-info-btn'
					>
						<Lang eng='Yes, I’ve written it down' cny='是的，我已经写下来了' />
						<i className='fa-solid fa-arrow-right-long'></i>
					</Button>
				</div>
				<Modal id='qr-modal' open={openQr}>
					<Title>
						<Lang eng='Mnemonic Phrase QR Code' cny='助记词二维码' />
					</Title>
					<div id='qrcode'>
						<QRCode size={220} value={phrase} />
					</div>
					<Button type='primary' onClick={setOpenQr}>
						<Lang eng='Close' cny='关' />
					</Button>
				</Modal>
			</div>
		</section>
	);
};
