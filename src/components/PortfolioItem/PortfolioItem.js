import React from 'react'
import styles from './portfolio-item.module.css'
import cn from 'classnames'
import fixNum from './../../Func.wallet/fixNum'
import { useNavigate } from 'react-router-dom'

const PortfolioItem = ({
	item,
	cryptoName,
	cryptoCount,
	cryptoPrice,
	cryptoProfit,
	cryptoImg,
}) => {
	const navigate = useNavigate()

	return (
		<li className={styles.item} onClick={() => navigate('/portfolio-open', {state: item})}>
			<div className={styles.top}>
				<div className={styles.info}>
					<img className={styles.img} src={cryptoImg} alt='' />
					<h4 className={styles.name}>{cryptoName.toUpperCase()}</h4>
				</div>
				<span className={styles.count}>{fixNum(cryptoCount)}</span>
			</div>
			<div className={styles.bottom}>
				<div className={styles.price}>{fixNum(cryptoPrice)}$</div>
				<div
					className={cn(styles.profit, {
						[styles.success]: cryptoProfit > 0,
						[styles.error]: cryptoProfit < 0,
					})}>
					{cryptoProfit}%
				</div>
			</div>
		</li>
	)
}

export default PortfolioItem
