import React from 'react'
import styles from './transaction-btn.module.css'
import SvgTransactions from './SvgPhrase'
import Lang from '../Lang/Lang'
const TransactionBtn = ({ type, onClick }) => {
	switch (type) {
		case 'send':
			return (
				<button className={styles.btn} onClick={onClick}>
					<SvgTransactions type='arr-top' />
					<Lang eng='Send' cny='发送' />
				</button>
			)
		case 'receive':
			return (
				<button className={styles.btn} onClick={onClick}>
					<SvgTransactions type='arr-bottom' />
					<Lang eng='Receive' cny='收到' />
				</button>
			)
		case 'swap':
			return (
				<button className={styles.btn} onClick={onClick}>
					<SvgTransactions type='swap' />
					<Lang eng='Swap' cny='交换' />
				</button>
			)
	}
}
export default TransactionBtn
