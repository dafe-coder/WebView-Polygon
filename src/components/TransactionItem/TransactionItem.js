import React, { useEffect } from 'react'
import styles from './transaction-item.module.css'
import cn from 'classnames'
import SvgTransactions from './../TransactionsBtn/SvgPhrase'
import Web3 from 'web3'
import Lang from '../Lang/Lang'
import fixNum from './../../Func.wallet/fixNum'

const TransactionItem = ({ type, itemData }) => {
	function getDateTransaction(time) {
		let dmy = [],
			date = new Date(+time * 1000)

		dmy = [
			('0' + date.getDate()).slice(-2),
			('0' + (date.getMonth() + 1)).slice(-2),
			date.getFullYear(),
		]
		return dmy
	}
	Number.prototype.noExponents = function () {
		var data = String(this).split(/[eE]/)
		if (data.length == 1) return data[0]

		var z = '',
			sign = this < 0 ? '-' : '',
			str = data[0].replace('.', ''),
			mag = Number(data[1]) + 1

		if (mag < 0) {
			z = sign + '0.'
			while (mag++) z += '0'
			return z + str.replace(/^\-/, '')
		}
		mag -= str.length
		while (mag--) z += '0'
		return str + z
	}
	switch (type) {
		case 'send':
			return (
				<li className={styles.item}>
					<div className={styles.top}>
						<h4 className={styles.c_red}>
							<span className={cn(styles.icon, styles.red)}>
								<SvgTransactions type='arr-top' />
							</span>
							<Lang eng='Send' cny='发送' />
						</h4>
						<span className={styles.value_red}>
						-{fixNum(itemData.attributes.transfers[0].quantity.float) + ' '}
							{itemData.attributes.transfers[0].fungible_info.symbol}
						</span>
					</div>
					<div className={styles.bottom}>
						<p>
							<strong>
								<Lang eng='To' cny='至' />:
							</strong>
							{itemData.attributes.sent_to.slice(0, 16) +
								'...' +
								itemData.attributes.sent_to.slice(-5)}
						</p>
						<span className={styles.date}>
							{getDateTransaction(+itemData.attributes.mined_at_block).map((item) =>
								item.length == 2 ? item + '.' : item
							)}
						</span>
					</div>
				</li>
			)
		case 'receive':
			return (
				<li className={styles.item}>
					<div className={styles.top}>
						<h4 className={styles.c_green}>
							<span className={cn(styles.icon, styles.green)}>
								<SvgTransactions type='arr-bottom' />
							</span>
							<Lang eng='Received' cny='已收到' />
						</h4>
						<span className={styles.value_green}>
						+ {fixNum(itemData.attributes.transfers[0].quantity.float) + ' '}
							{itemData.attributes.transfers[0].fungible_info?.symbol}
						</span>
					</div>
					<div className={styles.bottom}>
						<p>
							<strong>
								<Lang eng='From' cny='从' />:
							</strong>
							To:{' '}
							{itemData.attributes.sent_to.slice(0, 16) +
								'...' +
								itemData.attributes.sent_to.slice(-5)}
						</p>
						<span className={styles.date}>
							{getDateTransaction(+itemData.attributes.mined_at_block).map((item) =>
								item.length == 2 ? item + '.' : item
							)}
						</span>
					</div>
				</li>
			)
		case 'trade':
			return (
				<li className={styles.item}>
					<div className={styles.top}>
						<h4 className={styles.c_blue}>
							<span className={cn(styles.icon, styles.blue)}>
								<SvgTransactions type='swap' />
							</span>
							<Lang eng='Swap' cny='交换' /> + 
							{fixNum(itemData.attributes.transfers[0].quantity.float) + ' '}
							{itemData.attributes.transfers[0].fungible_info.symbol}
						</h4>
						<span className={styles.value_green}>
						{itemData.attributes.transfers[1].fungible_info.symbol +
								' / ' +
								itemData.attributes.transfers[0].fungible_info.symbol}
						</span>
					</div>
					<div className={styles.bottom}>
						<span className={styles.date}>
							{getDateTransaction(+itemData.attributes.mined_at_block).map((item) =>
								item.length == 2 ? item + '.' : item
							)}
						</span>
					</div>
				</li>
			)
	}
}
export default TransactionItem
