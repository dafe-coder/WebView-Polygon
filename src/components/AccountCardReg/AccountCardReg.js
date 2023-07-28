import React, { useState, useEffect } from 'react'
import styles from './account-card.module.css'
import { useSelector } from 'react-redux'
import Lang from '../Lang/Lang'
import LoaderCard from './../Loader/LoaderCard'
// import { rebuildObjPortfolio } from '../../services/WalletService'

const AccountCardReg = ({ dataCoins, setUpdateWallet }) => {
	// const { restoreAddress } = useSelector((state) => state.restore)
	const [accountDataLoading, setAccountDataLoading] = useState(true)
	const [data, setData] = useState([])
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setUpdateWallet({})
	// 	}, 300)
	// }, [])

	// React.useEffect(() => {
	// 	if (dataCoins !== 0 && dataCoins.length) {
	// 		setData(dataCoins)
	// 	} else {
	// 		setData([])
	// 	}
	// }, [dataCoins])

	// React.useEffect(() => {
	// 	if (data.length) {
	// 		setAccountDataLoading(false)
	// 	} else {
	// 		setAccountDataLoading(true)
	// 	}
	// }, [data])

	return (
		<div className={styles.card}>
			{accountDataLoading == false ? (
				<>
					<h5 className={styles.title}>
						<Lang eng='Account' cny='帐户' />
					</h5>
					{/* <p className={styles.output}>{restoreAddress}</p> */}
					<div className={styles.balance}>
						<h5>
							<Lang eng='Balance' cny='平衡' />:
						</h5>
						<span>
							{data.length
								? data.filter((item) => item.symbol.toUpperCase() == 'ETH')
										.length == 1
									? data.filter((item) => item.symbol.toUpperCase() == 'ETH')[0]
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
