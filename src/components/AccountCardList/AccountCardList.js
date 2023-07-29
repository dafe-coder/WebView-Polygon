import React, { useEffect, useState } from 'react'
import styles from './account-card-list.module.css'
import AccountCard from '../AccountCard/AccountCard'
import Lang from '../Lang/Lang'
import CryptoJS from 'crypto-js'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

const AccountCardList = () => {
	const {dataUser} = useSelector(state => state.storage)
	const kitkat = process.env.REACT_APP_KEY

	return (
		<ul className={styles.list}>
			{dataUser !== null && dataUser.length ? (
				dataUser.map((item) => (
					<AccountCard
						key={nanoid(2)}
						// key={CryptoJS.AES.decrypt(item.address, kitkat).toString(
						// 	CryptoJS.enc.Utf8
						// )}
						title={item.name}>
						{/* {CryptoJS.AES.decrypt(item.address, kitkat).toString(
							CryptoJS.enc.Utf8
						)} */}
					</AccountCard>
				))
			) : (
				<h4>
					<Lang eng='No accounts' cny='没有帐号' />
				</h4>
			)}
		</ul>
	)
}
export default AccountCardList
