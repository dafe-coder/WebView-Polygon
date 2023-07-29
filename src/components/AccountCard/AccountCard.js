import React, { useState, useEffect } from 'react'
import styles from './account-card.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import copyText from './../../Func.wallet/copy'
import SvgPhrase from '../PhraseBox/SvgPhrase'
import { setCurrentAccount } from '../../store/slices/storageSlice'

const AccountCard = ({ title, children, copy = true, one = false }) => {
	const dispatch = useDispatch()
	const { currentAccount, dataUser } = useSelector((state) => state.storage)
	const [active, setActive] = useState(false)
	const [copied, setCopied] = useState(false)
	const [currentAccountData, setCurrencyAccountData] = useState(null)

	React.useEffect(() => {
		if(dataUser !== null && dataUser.length) {
			setCurrencyAccountData(dataUser.find(item => item.title === currentAccount))
		}
	}, [currentAccount, dataUser])

	const onChooseWallet = (e) => {
		dispatch(setCurrentAccount(title))
		e.target
			.closest('ul')
			.querySelectorAll('li')
			.forEach((item) => {
				item.classList.remove('active-wallet')
			})
		e.target.closest('li').classList.add('active-wallet')
	}

	useEffect(() => {
			if (currentAccount == title) {
				setActive(true)
			} else {
				setActive(false)
			}
	}, [currentAccount])
	
	switch (one) {
		case true:
			return (
				<div className={cn(styles.card, { [styles.copy_card]: copy == true })}>
					{currentAccountData !== null && <button
						className={styles.btn_copy}
						type='copy'
						onClick={() => copyText(currentAccountData.address, setCopied)}
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
					</button>}
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

export default AccountCard
