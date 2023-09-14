import React from 'react';
import cn from 'classnames';
import Mnemonic from 'bitcore-mnemonic/lib/mnemonic';
import BoxWithIcon from '../../components/BoxWithIcon/BoxWithIcon';
import { useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Par from '../../components/Par/Par';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import {
	setPhrase,
	setPhraseArr,
	setPhraseArrScattered,
} from '../../store/slices/createSlice';
import { useNavigate } from 'react-router-dom';
import { shuffle } from '../../Func.wallet/shuffle';
import { generateMnemonic } from 'bip39';

export const CreateNotebook = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const createPhrase = () => {
		let code = generateMnemonic();
		let arr = code.trim().split(' ');
		const randomArr = shuffle(arr);

		dispatch(setPhrase(code));
		dispatch(setPhraseArr(arr));
		dispatch(setPhraseArrScattered(randomArr));
		navigate('/create-phrase');
	};

	return (
		<section className={cn('bg-white')}>
			<GoBack goTo='CreateWalletSuccess' />
			<Title mt>
				<Lang eng='Back Up Wallet' cny='备份钱包' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<BoxWithIcon
						title={<Lang eng='Take your notebook' cny='拿起你的笔记本' />}
					>
						<svg
							width='72'
							height='96'
							viewBox='0 0 72 96'
							fill='var(--yellow)'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M58.5 42H13.5C12.5625 42 12 42.75 12 43.5C12 44.4375 12.5625 45 13.5 45H58.5C59.25 45 60 44.4375 60 43.5C60 42.75 59.25 42 58.5 42ZM40.5 60H13.5C12.5625 60 12 60.75 12 61.5C12 62.4375 12.5625 63 13.5 63H40.5C41.25 63 42 62.4375 42 61.5C42 60.75 41.25 60 40.5 60ZM60 0H12C5.25 0 0 5.4375 0 12V84C0 90.75 5.25 96 12 96H60C66.5625 96 72 90.75 72 84V12C72 5.4375 66.5625 0 60 0ZM69 84C69 89.0625 64.875 93 60 93H12C6.9375 93 3 89.0625 3 84V12C3 7.125 6.9375 3 12 3H60C64.875 3 69 7.125 69 12V84ZM58.5 24H13.5C12.5625 24 12 24.75 12 25.5C12 26.4375 12.5625 27 13.5 27H58.5C59.25 27 60 26.4375 60 25.5C60 24.75 59.25 24 58.5 24Z' />
						</svg>
					</BoxWithIcon>
					<Par>
						<Lang
							eng='Please write the mnemonic phrase on the paper and store it safely.'
							cny='请将助记词写在纸上并妥善保存。'
						/>
						<br />
						<br />
						<Lang
							eng='You mnemonic phrase consists of 12-24 words. Anyone with your
						mnemonic phrase can access all your assets, so please store it
						safety.'
							cny='您的助记词由 12-24 个单词组成。 任何拥有您的助记词的人都可以访问您的所有资产，因此请妥善保管。'
						/>
					</Par>
				</div>
				<div className='wallet_body__bottom'>
					<Button type='white' onClick={() => createPhrase()} arrow={true}>
						<Lang eng='Back Up' cny='备份' />
					</Button>
				</div>
			</div>
		</section>
	);
};
