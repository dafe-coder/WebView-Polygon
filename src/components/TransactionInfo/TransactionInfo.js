import React from 'react'
import styles from './transaction-info.module.css'
import fixNum from './../../Func.wallet/fixNum'

const TransactionInfo = ({
	cryptoImg,
	cryptoName,
	cryptoPrice,
	current_price,
}) => {
	return (
		<div className={styles.body}>
			<img className={styles.logo} src={cryptoImg} alt={cryptoName} />
			<div className={styles.info}>
				<h4>{cryptoName}</h4>
				<span>{fixNum(Number(current_price))}</span>
			</div>
			<span className={styles.price}>~${fixNum(Number(cryptoPrice))}</span>
		</div>
	)
}
export default TransactionInfo
