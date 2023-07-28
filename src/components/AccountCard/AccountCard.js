import React, { useState, useEffect } from 'react'
import styles from './account-card.module.css'
import cn from 'classnames'
// import {
// 	setRestoreAddress,
// 	setPrivateKey,
// 	setRestorePhrase,
// } from '../../actions/restoreActions'
// import { setWalletChoose } from '../../actions/wallet'
import { useDispatch, useSelector } from 'react-redux'
import copyText from './../../pages/Func.wallet/copy'
import SvgPhrase from '../PhraseBox/SvgPhrase'
import CryptoJS from 'crypto-js'

const AccountCard = ({ title, children, copy = true, one = false }) => {
	const dispatch = useDispatch()
	// const { restoreAddress } = useSelector((state) => state.restore)
	const [active, setActive] = useState(false)
	const [copied, setCopied] = useState(false)
	const onChooseWallet = (e) => {
		// chrome.storage.local.set({ WalletChoose: title })
		// e.target
		// 	.closest('ul')
		// 	.querySelectorAll('li')
		// 	.forEach((item) => {
		// 		item.classList.remove('active-wallet')
		// 	})
		// e.target.closest('li').classList.add('active-wallet')
	// 	chrome.storage.local.get(['WalletChoose'], (result) => {
	// 		if (result.WalletChoose) {
	// 			chrome.storage.local.get(['userData'], function (res) {
	// 				res.userData.forEach((item) => {
	// 					if (item.name == result.WalletChoose) {
	// 						const kitkat = 'Qsx@ah&OR82WX9T6gCt'

	// 						dispatch(setWalletChoose(result.WalletChoose))
	// 						dispatch(
	// 							setRestoreAddress(
	// 								CryptoJS.AES.decrypt(item.address, kitkat).toString(
	// 									CryptoJS.enc.Utf8
	// 								)
	// 							)
	// 						)
	// 						dispatch(
	// 							setPrivateKey(
	// 								CryptoJS.AES.decrypt(item.privateKey, kitkat).toString(
	// 									CryptoJS.enc.Utf8
	// 								)
	// 							)
	// 						)
	// 						dispatch(
	// 							setRestorePhrase(
	// 								CryptoJS.AES.decrypt(item.phrase, kitkat).toString(
	// 									CryptoJS.enc.Utf8
	// 								)
	// 							)
	// 						)
	// 					}
	// 				})
	// 			})
	// 		}
	// 	})
	// }
	// useEffect(() => {
	// 	chrome.storage.local.get(['WalletChoose'], (result) => {
	// 		if (result.WalletChoose == title) {
	// 			setActive(true)
	// 		} else {
	// 			setActive(false)
	// 		}
	// 	})
	// }, [])
	switch (one) {
		case true:
			return (
				<div className={cn(styles.card, { [styles.copy_card]: copy == true })}>
					<button
						className={styles.btn_copy}
						type='copy'
						// onClick={() => copyText(restoreAddress, setCopied)}
						>
						{copied == true ? (
							<>
								<SvgPhrase type='check' />
							</>
						) : (
							<>
								<SvgPhrase type='copy' />
							</>
						)}
					</button>
					<h4 className={styles.title}>{title}</h4>
					<p className={cn(styles.address, styles.address_copy)}>{children}</p>
				</div>
			)
		case false:
			return (
				<li
					className={cn(styles.card, {
						['active-wallet']: active == true,
					})}
					onClick={(e) => onChooseWallet(e)}>
					<h4 className={styles.title}>{title}</h4>
					<p className={styles.address}>{children}</p>
				</li>
			)
		default:
			return <></>
	}
}
}
export default AccountCard
