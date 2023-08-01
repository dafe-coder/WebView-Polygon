import React from 'react'
import cn from 'classnames'
import Title from '../../components/Title/Title'
import Buttons from './../../components/Buttons/Buttons'
import MyAccount from '../../components/MyAccount/MyAccount'
import Button from '../../components/Button/Button'
import Svg from '../../svgs/Svg'
import Modal from './../../components/modal/Modal'
import Input from './../../components/Input/Input'
import styles from './accounts.module.css'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'

export const Accounts = () => {
    const navigate = useNavigate()

	const onLock = () => {
		chrome.storage.local.set({ timer: null })
		navigate('/welcome-back')
	}

	const onImport = () => {
		navigate('/import')
	}

	return (
		<section className='bg-white'>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							type='back'
							onClick={() => navigate('/wallet')}></Buttons>
						<Title>
							<Lang eng='Account' cny='帐户' />
						</Title>
						<div>
							<Buttons type='lock' onClick={onLock}>
								<Lang eng='Lock' cny='锁' />
							</Buttons>
						</div>
					</div>
					<MyAccount />
				</div>
				<div className='wallet-bottom'>
					{/* <Button type='border-primary' positionSvg='left' mb={true}>
						<Svg type='plus' />
						<Lang eng='Add account' cny='新增帐户' />
					</Button> */}
					<Button
						onClick={onImport}
						mt='0'
						type='border-primary'
						positionSvg='left'>
						<Svg type='upload' />
						<Lang eng='Import account' cny='导入帐号' />
					</Button>
				</div>
			</div>
			<Modal open={false} padding='20'>
				<Title mb='20'>
					<Lang eng='Add account' cny='新增帐户' />
				</Title>
				<form style={{ width: '100%' }}>
					<Input type='normal' id='name-wallet' label='Account Name' />
					<Button className={cn('disabled')}>
						<Lang eng='Confirm' cny='确认' />
					</Button>
				</form>
				<a href='#' className={styles.close_link}>
					<Lang eng='Cancel' cny='取消' />
				</a>
			</Modal>
		</section>
	)
}
