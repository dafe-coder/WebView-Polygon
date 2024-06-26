import React from 'react'
import cn from 'classnames'
import Par from './../../components/Par/Par'
import BoxWithIcon from './../../components/BoxWithIcon/BoxWithIcon'
import ConfirmInfo from './../../components/ConfirmInfo/ConfirmInfo'
import Button from './../../components/Button/Button'
import { useDispatch } from 'react-redux'
// import { setCurrentPage } from '../../actions/createActions'
import { useState } from 'react'
import GoBack from './../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
import Title from '../../components/Title/Title'
import { useNavigate } from 'react-router-dom'

export const CreateSubmit = () => {
	const navigate = useNavigate()
	const [checkInfo, setCheckInfo] = useState(false)

	const submitInfo = () => {
		navigate('/create-notebook', { replace: true })
	}

	return (
		<section className={cn('bg-white')}>
			<GoBack goTo='CreateWalletReg' />
			<Title mt>
				<Lang eng='Create Wallet' cny='创建钱包' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<BoxWithIcon
						title={
							<Lang eng='Wallet Created Successfully' cny='钱包创建成功' />
						}>
						<svg
							width='96'
							height='84'
							viewBox='0 0 96 84'
							fill='#4F33A3'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M18 30H6C2.625 30 0 32.625 0 35.8125V77.625C0 80.8125 2.625 83.4375 6 83.4375H18C21.1875 83.4375 24 80.8125 24 77.625V36C24 32.8125 21.1875 30 18 30ZM21 78C21 79.6875 19.5 81 18 81H6C4.3125 81 3 79.6875 3 78V36C3 34.5 4.3125 33 6 33H18C19.5 33 21 34.5 21 36V78ZM96 37.125C96 31.5 91.3125 27 85.875 27H61.6875C65.625 20.25 67.5 13.125 67.5 10.125C67.5 5.25 63.5625 0 57 0C44.4375 0 51 14.4375 36.75 25.6875L30.5625 30.375C30.1875 30.75 29.8125 31.125 29.8125 31.5C29.8125 32.625 30.75 33 31.3125 33C31.5 33 31.875 33 32.0625 32.8125L38.4375 28.125C53.4375 16.125 47.4375 3 57 3C61.6875 3 64.5 6.75 64.5 10.125C64.5 12.375 62.625 19.5 58.6875 26.25L57.75 27.75C57.5625 27.9375 57.375 28.3125 57.375 28.5C57.375 29.4375 58.125 30 58.875 30H85.875C89.8125 30 93 33.1875 93 37.125C93 40.6875 90 43.875 86.25 44.0625C85.5 44.0625 84.9375 44.8125 84.9375 45.5625C84.9375 46.875 87.1875 47.625 87.1875 51.375C87.1875 54.75 84.75 57.5625 81.375 58.3125C80.8125 58.3125 80.25 58.875 80.25 59.625C80.25 60.75 81.375 61.5 81.375 64.125C81.375 67.125 79.5 69.75 76.5 70.6875C75.9375 71.0625 75.5625 71.625 75.5625 72.1875C75.5625 72.5625 75.75 73.125 75.75 74.0625C75.75 78 72.5625 81.1875 68.625 81.1875H58.125C52.3125 81.1875 46.5 79.125 41.8125 75.75L32.25 69.375C32.0625 69.1875 31.6875 69.1875 31.5 69.1875C30.5625 69.1875 30 69.75 30 70.6875C30 71.0625 30.1875 71.625 30.5625 71.8125L40.125 78.1875C45.1875 81.9375 51.75 84 58.125 84H68.625C74.25 84 78.75 79.6875 78.75 74.0625C78.75 73.6875 78.75 73.5 78.75 73.125C82.125 71.4375 84.375 68.0625 84.375 64.125C84.375 63 84.1875 61.6875 83.8125 60.5625C87.5625 59.25 90.1875 55.5 90.1875 51.375C90.1875 49.6875 89.8125 48 88.875 46.6875C93 45.1875 96 41.4375 96 37.125Z' />
						</svg>
					</BoxWithIcon>
					<Par>
						<Lang
							eng='On the following screen, you will see a set of 12-24 random words.'
							cny='在以下屏幕上，您将看到一组 12-24 个随机单词。'
						/>
						<br />
						<br />
						<Lang
							eng='This is your wallet backup phrase. It can be entered in any version
						of Name in order to back up or restore your wallet’s funds and
						private key.'
							cny='这是您的钱包备用短语。 可以在任何版本的名称中输入它，以备份或恢复您钱包的资金和私钥。'
						/>
					</Par>
				</div>
				<div className='wallet_body__bottom'>
					<ConfirmInfo
						checkInfo={checkInfo}
						setCheckInfo={setCheckInfo}
						id='confirm-info-checkbox'>
						<Lang
							eng='Make sure nobody looks into your screen unless you want them to have
						access to your funds.'
							cny='确保没有人查看您的屏幕，除非您希望他们访问您的资金。'
						/>
					</ConfirmInfo>
					<Button
						onClick={submitInfo}
						className={cn({ ['disabled']: checkInfo == false })}
						type='primary'
						id='confirm-info-btn'>
						<Lang eng='Continue' cny='继续' />
						<i className='fa-solid fa-arrow-right-long'></i>
					</Button>
				</div>
			</div>
		</section>
	)
}