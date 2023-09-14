import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import PhraseBox from '../../components/PhraseBox/PhraseBox';
import { useSelector, useDispatch } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import randomNum from '../../Func.wallet/randomNum';
import { setCountVerification, setWord1 } from '../../store/slices/createSlice';
import { useNavigate } from 'react-router-dom';

const VerificatePhrase1 = () => {
	const navigate = useNavigate();
	const { word1, countVerification } = useSelector((state) => state.create);
	const dispatch = useDispatch();

	useEffect(() => {
		if (countVerification.length === 0) {
			let num1 = randomNum(1, 12);
			let num2 = '';
			let num3 = '';

			for (let i = 0; i <= 1; ) {
				num2 = randomNum(1, 12);
				if (num2 != num1) {
					i = 1;
					break;
				} else {
					i = 0;
				}
			}
			for (let i = 0; i <= 1; ) {
				num3 = randomNum(1, 12);
				if (num3 != num1 && num3 != num2) {
					i = 1;
					break;
				} else {
					i = 0;
				}
			}
			dispatch(setCountVerification([num1, num2, num3]));
		}
	}, []);

	const goToNextPage = () => {
		if (word1 != '') {
			navigate('/verificate-phrase-2');
		}
	};

	return (
		<section className={cn('bg-white')}>
			<GoBack />
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
						(1/3)
					</Title>
					<PhraseBox nums btns={false} />
					<Title type='sm'>
						<Lang eng='Select word number ' cny='选择字数 ' />
						{countVerification[0]} :
					</Title>
					<PhraseBox
						wordActive={word1}
						btns={false}
						select={true}
						setWord={setWord1}
					/>
				</div>
				<div className='wallet_body__bottom'>
					<Button
						onClick={goToNextPage}
						className={cn({ ['disabled']: word1 == '' })}
						type='white'
						id='confirm-info-btn'
					>
						<Lang eng='Next' cny='下一个' />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default VerificatePhrase1;
