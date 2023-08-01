import React, { useEffect, useState } from 'react'
import Par from './../../components/Par/Par'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
// import { setCurrentPage } from '../../actions/createActions'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import Lang from '../Lang/Lang'
import { useNavigate } from 'react-router-dom'

const Form = () => {
	const navigate = useNavigate()
	const { passwordValid, passwordMatch, nameValid } =
		useSelector((state) => state.create)

	const [activeButton, setActiveButton] = useState(false)

	useEffect(() => {
		if (passwordValid && passwordMatch && nameValid) {
			setActiveButton(true)
		} else {
			setActiveButton(false)
		}
	}, [passwordValid, passwordMatch, nameValid])

	const submitForm = () => {
		if (activeButton) {
			navigate('/create-submit')
		}
	}

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
				type='primary'
				className={cn({ ['disabled']: activeButton == false })}
				onClick={submitForm}
				>
				<i className='fa-solid fa-wallet'></i>
				{<Lang eng='Create Personal wallet' cny='创建个人钱包' />}
			</Button>
		</form>
	)
}

export default Form
