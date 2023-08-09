import React from 'react'
import Title from '../../components/Title/Title'
import Buttons from '../../components/Buttons/Buttons'
import Par from '../../components/Par/Par'
import AllowData from '../../components/AllowData/AllowData'
import Dropdown from '../../components/Dropdown/Dropdown'
import { useSelector } from 'react-redux'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'

export const SecurityPrivacy = () => {
    const navigate = useNavigate()
	const { chooseTimeOut } = useSelector((state) => state.storage)
	
	const dataDropdown = [
		{ value: '5 minutes', langWords: <Lang eng='5 minutes' cny='5 分钟' /> },
		{ value: '15 minutes', langWords: <Lang eng='15 minutes' cny='15 分钟' /> },
		{ value: '30 minutes', langWords: <Lang eng='30 minutes' cny='30 分钟' /> },
		{ value: '1 hour', langWords: <Lang eng='1 hour' cny='1 小时' /> },
		{ value: '6 hours', langWords: <Lang eng='6 hours' cny='6 个小时' /> },
		{ value: 'never', langWords: <Lang eng='never' cny='绝不' /> },
	]
	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate(-1)}
							type='back'
						/>
						<Title>
							<Lang eng='Security and Privacy' cny='安全和隐私' />
						</Title>
						<div></div>
					</div>
					<Title type='sm' mb='0'>
						<Lang eng='Auto Lock Timer' cny='自动锁定定时器' />
					</Title>
					<Par>
						<Lang
							eng='Set the idle time in minutes before USDT Wallet is locked.'
							cny='以分钟为单位设置 USDT Wallet 锁定前的空闲时间。'
						/>
					</Par>
					<Dropdown
						type='log-time-out'
						dataDropdown={dataDropdown}
						active={chooseTimeOut}
					/>
				</div>
				<div className='wallet-bottom'>
					<AllowData />
				</div>
			</div>
		</section>
	)
}