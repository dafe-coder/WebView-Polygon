import React, { useState, useEffect } from 'react'
import styles from './transaction-list.module.css'
import TransactionItem from './../TransactionItem/TransactionItem'

const TransactionList = ({ style, data }) => {
	console.log(data);
	return (
		<ul className={styles.list} style={style}>
			{data.map((item, i) => {
				return <TransactionItem key={i} type={item.attributes.operation_type} itemData={item} />
			})}
		</ul>
	)
}
export default TransactionList
