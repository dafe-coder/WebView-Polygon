import React from 'react'
import Title from '../Title/Title'
import styles from './my-account.module.css'
import Svg from './../../svgs/Svg'
import Buttons from '../Buttons/Buttons'
import AccountCardList from '../AccountCardList/AccountCardList'
import Lang from '../Lang/Lang'
import { useNavigate } from 'react-router-dom'

const MyAccount = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.account_card}>
			<div className={styles.top}>
				<Svg type='user' />
				<Title type='sm' color='dark'>
					<Lang eng='My Account' cny='我的帐户' />
				</Title>
				<Buttons
					type='sm-primary'
					onClick={() => navigate('/manage-account')}>
					<Lang eng='Manage' cny='管理' />
				</Buttons>
			</div>
			<div className={styles.bottom}>
				<AccountCardList />
			</div>
		</div>
	)
}
export default MyAccount
