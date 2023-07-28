import React, { useState } from 'react'
import cn from 'classnames'
import styles from './seeed-phrase.module.css'
import copyText from '../../pages/Func.wallet/copy'
import SvgPhrase from '../PhraseBox/SvgPhrase'
import { useSelector } from 'react-redux/es/exports'
import Lang from './../Lang/Lang'

const SeedPhraseBox = ({ show, prKey = false }) => {
	const [copied, setCopied] = useState(false)
	const { privateKey, restorePhrase } = useSelector((state) => state.restore)
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
			<div
				className={cn(styles.phrase, {
					[styles.cut_text]: prKey == true,
				})}>
				{prKey ? privateKey : restorePhrase}
			</div>
			<button
				type='copy'
				onClick={() => copyText(prKey ? privateKey : restorePhrase, setCopied)}
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
			</button>
		</div>
	)
}
export default SeedPhraseBox
