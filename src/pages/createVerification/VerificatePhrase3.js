import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import PhraseBox from '../../components/PhraseBox/PhraseBox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import GoBack from '../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
import { resetWallet, setCurrentAccount, setData, setIsLogin } from '../../store/slices/storageSlice'
import CryptoJS from 'crypto-js'
import generatePrivateKeyFromSeed from '../../Func.wallet/generateAddress'
import {
	setWord3,
	resetCreate
} from '../../store/slices/createSlice'
import { logTimer } from '../../Func.wallet/logTimer'
import Modal from '../../components/modal/Modal'
import { setPassword } from '../../store/slices/storageSlice'
import { useNavigate } from 'react-router-dom'
import { setDataWallet, setWalletNew } from '../../store/slices/walletSlice'

const kitkat = process.env.REACT_APP_KEY

export const VerificatePhrase3 = () => {
	const navigate = useNavigate()
	const { name, phrase, passwordInit, word1, word2, word3, phraseArr, countVerification } =
		useSelector((state) => state.create)
	const dispatch = useDispatch()
	const [showErrorVerification, setShowErrorVerification] = React.useState(false)
	const [showSuccessVerification, setShowSuccessVerification] = React.useState(false)
	const [loadingFinished, setLoadingFinished] = React.useState(false)

	React.useEffect(() => {
		if(loadingFinished) {
			navigate('/wallet')
		}
	}, [loadingFinished])
	
	const goToNextPage = () => {
		if (word3 != '') {
			if (
				phraseArr[countVerification[0] - 1] === word1 &&
				phraseArr[countVerification[1] - 1] === word2 &&
				phraseArr[countVerification[2] - 1] === word3
			) {
				dispatch(setWalletNew(true))
				dispatch(setDataWallet(null))
				setLoadingFinished(false)
				setShowSuccessVerification(true)
				dispatch(resetWallet())
				logTimer('30 minutes', dispatch)
				const privateKey = generatePrivateKeyFromSeed(phrase, 12)
				let phraseCrypt =
				phrase != ''
					? CryptoJS.AES.encrypt(phrase, kitkat).toString()
					: ''
				let privateKeyCrypt = CryptoJS.AES.encrypt(
					privateKey,
					kitkat
				).toString()
				const newDataUser = {
					name: name,
					phrase: phraseCrypt,
					address: '',
					privateKey: privateKeyCrypt,
				}
				dispatch(setData(newDataUser))
				dispatch(setPassword(passwordInit))
				dispatch(setCurrentAccount(name))
				dispatch(resetCreate())
				dispatch(setIsLogin(true))
				setTimeout(() => {
					setShowSuccessVerification(false)
					setLoadingFinished(true)
				}, 3000)
			} else {
				setShowErrorVerification(true)
				setTimeout(() => {
					setShowErrorVerification(false)
					navigate('/create-phrase')
				}, 3000)
			}
		}
	}
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
					<PhraseBox wordActive={word3} btns={false} select={true} setWord={setWord3} />
				</div>
				<div className='wallet_body__bottom'>
					<Button
						onClick={goToNextPage}
						className={cn({ ['disabled']: word3 == '' })}
						type='primary'
						id='confirm-info-btn'>
						<Lang eng='Next' cny='下一个' />
					</Button>
				</div>
			</div>
			<Modal
				open={showErrorVerification}
				openFunc={setShowErrorVerification}
				closeOnBody={false}
				id='#error-verification-modal'>
				<svg
					width='97'
					height='84'
					viewBox='0 0 97 84'
					fill='#F04848'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M48.9999 54C49.7499 54 50.4999 53.4375 50.4999 52.5V22.5C50.4999 21.75 49.7499 21 48.9999 21C48.0624 21 47.4999 21.75 47.4999 22.5V52.5C47.4999 53.4375 48.0624 54 48.9999 54ZM95.8749 72.1875L55.9374 3.9375C54.2499 1.3125 51.6249 0 48.9999 0C46.1874 0 43.5624 1.3125 41.8749 3.9375L1.7499 72.1875C-1.0626 77.4375 2.6874 84 8.8749 84H88.9374C95.1249 84 98.8749 77.4375 95.8749 72.1875ZM93.2499 78.5625C92.3124 80.0625 90.8124 81 88.9374 81H8.8749C6.9999 81 5.4999 80.25 4.5624 78.5625C3.6249 77.0625 3.6249 75.375 4.5624 73.875L44.4999 5.625C45.4374 3.9375 47.1249 3 48.9999 3C50.6874 3 52.3749 3.9375 53.3124 5.625L93.2499 73.875C94.1874 75.375 94.1874 77.0625 93.2499 78.5625ZM48.9999 63C47.3124 63 45.9999 64.5 45.9999 66C45.9999 67.6875 47.3124 69 48.9999 69C50.4999 69 51.9999 67.6875 51.9999 66C51.9999 64.5 50.4999 63 48.9999 63Z' />
				</svg>
				<Title type='error'>
					<Lang
						eng='Please check your details again!'
						cny='请再次检查您的详细信息！'
					/>
				</Title>
			</Modal>
			<Modal
				open={showSuccessVerification}
				openFunc={setShowSuccessVerification}
				closeOnBody={false}
				id='#success-verification-modal'>
				<svg
					width='121'
					height='90'
					viewBox='0 0 121 90'
					fill='#4F33A3'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M19.8125 3C12.5 3 6.3125 9.1875 6.3125 16.5V24C6.3125 24.9375 5.75 25.5 4.8125 25.5C4.0625 25.5 3.3125 24.9375 3.3125 24V16.5C3.3125 7.5 10.8125 0 19.8125 0C29 0 36.3125 7.5 36.3125 16.5V19.5C36.3125 24.1875 36.125 29.0625 35.375 33.5625L67.4375 24.1875C68 24 68.75 24.1875 69.125 24.75C69.5 25.125 69.5 25.875 69.125 26.4375L55.625 48H77C77.75 48 78.5 48.75 78.5 49.5C78.5 50.4375 77.75 51 77 51H53C52.4375 51 51.875 50.8125 51.6875 50.25C51.3125 49.875 51.3125 49.3125 51.6875 48.75L64.625 28.125L34.8125 36.9375C34.625 38.25 34.4375 39.375 34.0625 40.6875L33.125 44.8125C31.25 53.25 28.25 61.5 24.125 69.1875L19.0625 78.75C17.375 82.125 14 84 10.25 84C4.8125 84 0.5 79.6875 0.5 74.25V54C0.5 48 4.25 42.75 10.0625 41.0625L32.1875 34.5C32.9375 29.625 33.5 24.5625 33.5 19.5V16.5C33.5 9.1875 27.3125 3 20 3H19.8125ZM31.625 37.875L11 44.0625C6.5 45.375 3.5 49.3125 3.5 54V74.25C3.5 78 6.5 81 10.25 81C12.875 81 15.3125 79.6875 16.4375 77.4375L21.5 67.875C25.4375 60.375 28.4375 52.3125 30.3125 44.0625L31.25 40.125C31.25 39.375 31.4375 38.625 31.625 37.875ZM39.3125 64.5C39.3125 63.75 40.0625 63 40.8125 63H71C71.75 63 72.5 63.75 72.5 64.5C72.5 65.4375 71.75 66 71 66H40.8125C40.0625 66 39.3125 65.4375 39.3125 64.5ZM99.5 30C106.062 30 111.5 35.4375 111.5 42V54H114.5C117.688 54 120.5 56.8125 120.5 60V84C120.5 87.375 117.688 90 114.5 90H84.5C81.125 90 78.5 87.375 78.5 84V60C78.5 56.8125 81.125 54 84.5 54H87.5V42C87.5 35.4375 92.75 30 99.5 30ZM99.5 33C94.4375 33 90.5 37.125 90.5 42V54H108.5V42C108.5 37.125 104.375 33 99.5 33ZM81.5 60V84C81.5 85.6875 82.8125 87 84.5 87H114.5C116 87 117.5 85.6875 117.5 84V60C117.5 58.5 116 57 114.5 57H84.5C82.8125 57 81.5 58.5 81.5 60Z' />
				</svg>
				<Title type='success'>
					<Lang eng='Verification Success!' cny='验证成功！' />
				</Title>
			</Modal>
		</section>
	)
}