import React, { useState } from 'react'
import cn from 'classnames'
import styles from './seeed-phrase.module.css'
import copyText from '../../Func.wallet/copy'
import SvgPhrase from '../PhraseBox/SvgPhrase'
import { useSelector } from 'react-redux/es/exports'
import Lang from './../Lang/Lang'
import CryptoJS from 'crypto-js'


const SeedPhraseBox = ({ show, prKey = false }) => {
	const kitkat = 'aBN6qreLALR9QYPy'
	const [copied, setCopied] = useState(false)
	const { dataUser, currentAccount } = useSelector((state) => state.storage)
	const [currentAccountData, setCurrentAccountData] = React.useState(null)

	React.useEffect(() => {
		if(dataUser !== null) {
			setCurrentAccountData(dataUser.find(item => item.name === currentAccount))
		}
	}, [dataUser])

	return (
		<div
			className={cn(styles.body, {
				[styles.show]: show == true,
			})}>
			<label className={styles.label}>
				{prKey ? (
					<Lang eng='Your private key' cny='你的私钥' />
				) : (
					<Lang eng='Your seed phrase' cny='你的助记词' />
				)}
			</label>
			{currentAccountData !== null && <div
				className={cn(styles.phrase, {
					[styles.cut_text]: prKey == true,
				})}>
				{prKey ? CryptoJS.AES.decrypt(currentAccountData.privateKey, kitkat).toString(CryptoJS.enc.Utf8) : CryptoJS.AES.decrypt(currentAccountData.phrase, kitkat).toString(CryptoJS.enc.Utf8)}
			</div>} 
			{currentAccountData !== null && <button
				type='copy'
				onClick={() => copyText(prKey ? CryptoJS.AES.decrypt(currentAccountData.privateKey, kitkat).toString(CryptoJS.enc.Utf8) : CryptoJS.AES.decrypt(currentAccountData.phrase, kitkat).toString(CryptoJS.enc.Utf8), setCopied)}
				className={cn(styles.copy_btn, {
					[styles.success]: copied == true,
				})}>
				{copied == true ? (
					<>
						<SvgPhrase type='check' />
					</>
				) : (
					<>
						<SvgPhrase type='copy' />
					</>
				)}
			</button>}
		</div>
	)
}
export default SeedPhraseBox
