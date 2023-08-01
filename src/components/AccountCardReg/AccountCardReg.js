import React, { useState, useEffect } from 'react'
import styles from './account-card.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Lang from '../Lang/Lang'
import LoaderCard from './../Loader/LoaderCard'
import { fetchDataWallet } from '../../store/slices/walletSlice';

const AccountCardReg = () => {
	const dispatch = useDispatch()
	const {walletAddress, dataWallet, walletNew} = useSelector(state => state.wallet)
	const {dataUser, currentAccount} = useSelector(state => state.storage)
	const [accountDataLoading, setAccountDataLoading] = useState(true)
	
	React.useEffect(() => {
		console.log(dataUser);
		if (dataWallet === null && dataUser !== null) {
			let account = dataUser.find((item) => item.name === currentAccount)
			dispatch(
				fetchDataWallet([
					account.phrase !== '' ? account.phrase : account.privateKey,
					walletNew,
				])
			)
		}
	}, [dataUser, dataWallet])

	return (
		<div className={styles.card}>
			{dataWallet !== null ? (
				<>
					<h5 className={styles.title}>
						<Lang eng='Account' cny='帐户' />
					</h5>
					<p className={styles.output}>{walletAddress}</p>
					<div className={styles.balance}>
						<h5>
							<Lang eng='Balance' cny='平衡' />:
						</h5>
						<span>
							{dataWallet !== null && dataWallet.position?.length
								? dataWallet.position.filter((item) => item.symbol.toUpperCase() == 'ETH')
										.length == 1
									? dataWallet.position.filter((item) => item.symbol.toUpperCase() == 'ETH')[0]
											.market_data.balance
									: 0
								: 0}{' '}
							ETH
						</span>
					</div>
				</>
			) : (
				<LoaderCard />
			)}
		</div>
	)
}

export default AccountCardReg
