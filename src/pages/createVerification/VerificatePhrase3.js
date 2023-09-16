import React from 'react';
import cn from 'classnames';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import PhraseBox from '../../components/PhraseBox/PhraseBox';
import Par from '../../components/Par/Par';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import {
	resetWallet,
	setCurrentAccount,
	setData,
	setIsLogin,
} from '../../store/slices/storageSlice';
import CryptoJS from 'crypto-js';
import generatePrivateKeyFromSeed from '../../Func.wallet/generateAddress';
import {
	setWord3,
	resetCreate,
	setCountVerification,
	setWord1,
	setWord2,
} from '../../store/slices/createSlice';
import { logTimer } from '../../Func.wallet/logTimer';
import Modal from '../../components/modal/Modal';
import { setPassword } from '../../store/slices/storageSlice';
import { useNavigate } from 'react-router-dom';
import { setDataWallet, setWalletNew } from '../../store/slices/walletSlice';
import styles from './vereficate.module.css';
import Svg from '../../svgs/Svg';
const kitkat = process.env.REACT_APP_KEY;

export const VerificatePhrase3 = () => {
	const navigate = useNavigate();
	const {
		name,
		phrase,
		passwordInit,
		word1,
		word2,
		word3,
		phraseArr,
		countVerification,
	} = useSelector((state) => state.create);
	const dispatch = useDispatch();
	const [showErrorVerification, setShowErrorVerification] =
		React.useState(false);
	const [showSuccessVerification, setShowSuccessVerification] =
		React.useState(false);
	const [loadingFinished, setLoadingFinished] = React.useState(false);

	React.useEffect(() => {
		if (loadingFinished) {
			navigate('/loader');
		}
	}, [loadingFinished]);

	const goToNextPage = () => {
		if (word3 != '') {
			if (
				phraseArr[countVerification[0] - 1] === word1 &&
				phraseArr[countVerification[1] - 1] === word2 &&
				phraseArr[countVerification[2] - 1] === word3
			) {
				dispatch(setWalletNew(true));
				dispatch(setDataWallet(null));
				setLoadingFinished(false);
				setShowSuccessVerification(true);
				dispatch(resetWallet());
				logTimer('30 minutes', dispatch);
				const privateKey = generatePrivateKeyFromSeed(phrase, 12);
				let phraseCrypt =
					phrase != '' ? CryptoJS.AES.encrypt(phrase, kitkat).toString() : '';
				let privateKeyCrypt = CryptoJS.AES.encrypt(
					privateKey,
					kitkat
				).toString();
				const newDataUser = {
					name: name,
					phrase: phraseCrypt,
					address: '',
					privateKey: privateKeyCrypt,
				};
				dispatch(setData(newDataUser));
				dispatch(setPassword(passwordInit));
				dispatch(setCurrentAccount(name));
				dispatch(resetCreate());
				dispatch(setIsLogin(true));
				setTimeout(() => {
					setShowSuccessVerification(false);
					setLoadingFinished(true);
				}, 3000);
			} else {
				dispatch(setCountVerification([]));
				setShowErrorVerification(true);
				dispatch(setWord1(''));
				dispatch(setWord2(''));
				dispatch(setWord3(''));
				setTimeout(() => {
					setShowErrorVerification(false);
					navigate('/create-phrase');
				}, 3000);
			}
		}
	};
	return (
		<section className={cn('bg-white')}>
			<GoBack goTo='VerificatePhrase2' />
			<Title mt>
				<Lang eng='Verify Mnemonic' cny='验证助记符' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<Title type='sm'>
						<Lang
							eng='Please verify your mnemonic phrase:'
							cny='请验证您的助记词：'
						/>{' '}
						(3/3)
					</Title>
					<PhraseBox nums btns={false} />
					<Title type='sm'>
						<Lang eng='Select word number ' cny='选择字数 ' />
						{countVerification[2]}:
					</Title>
					<PhraseBox
						wordActive={word3}
						btns={false}
						select={true}
						setWord={setWord3}
					/>
				</div>
				<div className='wallet_body__bottom'>
					<Button
						onClick={goToNextPage}
						className={cn({ ['disabled']: word3 == '' })}
						type='white'
						id='confirm-info-btn'
					>
						<Lang eng='Next' cny='下一个' />
					</Button>
				</div>
			</div>
			<Modal
				style={{ padding: '70px 20px 30px' }}
				open={showErrorVerification}
				openFunc={setShowErrorVerification}
				closeOnBody={false}
				id='#error-verification-modal'
			>
				<div className={cn(styles.circle, styles.circleRed)}>
					<Svg type='alert-octagon' />
				</div>
				<Title color='white' mb>
					<Lang eng='Warning!' cny='警告!' />
				</Title>
				<Par style={{ marginTop: '5px' }}>
					<Lang
						eng='Please check your details again!'
						cny='请再次检查您的详细信息！'
					/>
				</Par>
			</Modal>
			<Modal
				style={{ padding: '70px 20px 30px' }}
				open={showSuccessVerification}
				openFunc={setShowSuccessVerification}
				closeOnBody={false}
				id='#success-verification-modal'
			>
				<div className={cn(styles.circle, styles.circleGreen)}>
					<svg
						width={32}
						height={32}
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='user-check'
					>
						<path
							d='M21.3333 27V24.3333C21.3333 22.9188 20.7713 21.5623 19.7712 20.5621C18.771 19.5619 17.4144 19 15.9999 19H6.66659C5.2521 19 3.89554 19.5619 2.89535 20.5621C1.89516 21.5623 1.33325 22.9188 1.33325 24.3333V27'
							stroke='var(--yellow)'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
							className='Vector'
						/>
						<path
							d='M11.3333 13.6667C14.2789 13.6667 16.6667 11.2789 16.6667 8.33333C16.6667 5.38781 14.2789 3 11.3333 3C8.38781 3 6 5.38781 6 8.33333C6 11.2789 8.38781 13.6667 11.3333 13.6667Z'
							stroke='var(--yellow)'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
							className='Vector_2'
						/>
						<path
							d='M22.6667 13.6667L25.3334 16.3333L30.6667 11'
							stroke='var(--yellow)'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
							className='Vector_3'
						/>
					</svg>
				</div>

				<Title color='white' type='success' mb>
					<Lang eng='Verification Success!' cny='验证成功！' />
				</Title>
				<Par style={{ marginTop: '5px', textAlign: 'center' }}>
					<Lang
						eng='You will be redirected to your wallet in a while.'
						cny='稍后您将被重定向到您的钱包。'
					/>
				</Par>
			</Modal>
		</section>
	);
};
