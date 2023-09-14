import React, { useEffect, useState } from 'react';
import Par from './../../components/Par/Par';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
// import { setCurrentPage } from '../../actions/createActions'
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Lang from '../Lang/Lang';
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const navigate = useNavigate();
	const { passwordValid, passwordMatch, nameValid } = useSelector(
		(state) => state.create
	);

	const [activeButton, setActiveButton] = useState(false);

	useEffect(() => {
		if (passwordValid && passwordMatch && nameValid) {
			setActiveButton(true);
		} else {
			setActiveButton(false);
		}
	}, [passwordValid, passwordMatch, nameValid]);

	const submitForm = () => {
		if (activeButton) {
			navigate('/create-submit');
		}
	};

	return (
		<form action='#' className='wallet_form'>
			<div className='create-wallet_info'>
				<Par>
					<Lang
						eng='Your mnemonic phrase is encrypted and stored safety on your device.
					Only you have full access to your assets.'
						cny='您的助记词已加密并安全存储在您的设备上。 只有您可以完全访问您的资产。'
					/>
				</Par>
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
				<Input
					id='input-password'
					label={<Lang eng='Spending password' cny='消费密码' />}
					type='password'
				/>
				<Input
					id='confirm-password'
					label={<Lang eng='Spending password' cny='消费密码' />}
					type='password-check'
					errorPar={<Lang eng='Passwords doesn’t match!' cny='密码不符！' />}
				/>
			</div>
			<Button
				positionSvg='right'
				type='white'
				className={cn({ ['disabled']: activeButton == false })}
				onClick={submitForm}
			>
				{<Lang eng='Create Personal wallet' cny='创建个人钱包' />}
				<svg
					width='15'
					height='10'
					viewBox='0 0 15 10'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M9.16016 8.93359C9.02344 8.82422 8.96875 8.66016 8.96875 8.46875C8.96875 8.30469 9.02344 8.14062 9.16016 8.03125L11.7578 5.40625H0.65625C0.273438 5.40625 0 5.13281 0 4.75C0 4.39453 0.273438 4.09375 0.65625 4.09375H11.7578L9.16016 1.49609C8.88672 1.25 8.88672 0.839844 9.16016 0.59375C9.40625 0.320312 9.81641 0.320312 10.0898 0.59375L13.8086 4.3125C14.0547 4.55859 14.0547 4.96875 13.8086 5.21484L10.0898 8.93359C9.81641 9.20703 9.40625 9.20703 9.16016 8.93359Z'
						fill='#999999'
					/>
				</svg>
			</Button>
		</form>
	);
};

export default Form;
