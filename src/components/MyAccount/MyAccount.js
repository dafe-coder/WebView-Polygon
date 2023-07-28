import React from 'react'
import Title from '../Title/Title'
import styles from './my-account.module.css'
import Svg from './../../svgs/Svg'
import Buttons from '../Buttons/Buttons'
import AccountCardList from '../AccountCardList/AccountCardList'
import { setCurrentPage } from '../../actions/createActions'
import { useDispatch } from 'react-redux'
import Lang from '../Lang/Lang'
const MyAccount = () => {
	const dispatch = useDispatch()
	return (
		<div className={styles.account_card}>
			<div className={styles.top}>
				<Svg type='user' />
				<Title type='sm' color='dark'>
					<Lang eng='My Account' cny='我的帐户' />
				</Title>
				<Buttons
					type='sm-primary'
					onClick={() => dispatch(setCurrentPage('ManageAccounts'))}>
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
