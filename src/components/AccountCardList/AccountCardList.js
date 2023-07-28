import React, { useEffect, useState } from 'react'
import styles from './account-card-list.module.css'
import AccountCard from '../AccountCard/AccountCard'
import Lang from '../Lang/Lang'
import CryptoJS from 'crypto-js'

const AccountCardList = () => {
	const [data, setData] = useState(null)
	const kitkat = 'Qsx@ah&OR82WX9T6gCt'
	useEffect(() => {
		chrome.storage.local.get(['userData'], function (result) {
			setData(result.userData)
		})
	}, [])
	return (
		<ul className={styles.list}>
			{data != null ? (
				data.map((item) => (
					<AccountCard
						key={CryptoJS.AES.decrypt(item.address, kitkat).toString(
							CryptoJS.enc.Utf8
						)}
						title={item.name}>
						{CryptoJS.AES.decrypt(item.address, kitkat).toString(
							CryptoJS.enc.Utf8
						)}
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
