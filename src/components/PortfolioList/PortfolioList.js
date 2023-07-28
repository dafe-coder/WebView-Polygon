import React, { useEffect } from 'react'
import PortfolioItem from '../PortfolioItem/PortfolioItem'
import LoaderList from '../Loader/LoaderList'
const PortfolioList = ({ className, data,  }) => {
	return data !== null && data.length ? (
		<ul className={className} style={{ marginBottom: 70 }}>
			{data.length ? (
				data.map((item) => {
					if (item != undefined) {
						return (
							<PortfolioItem
								item={item}
								key={item.id}
								cryptoName={item.symbol}
								cryptoCount={
									item.market_data.balance_crypto > 0
										? item.market_data.balance_crypto
										: 0
								}
								cryptoPrice={item.market_data.current_price}
								cryptoProfit={
									item.changes && item.changes.percent
										? item.changes.percent?.toFixed(2)
										: ''
								}
								cryptoImg={item.image.thumb}
							/>
						)
					}
				})
			) : (
				<></>
			)}
		</ul>
	) : (
		<LoaderList />
	)
}

export default PortfolioList
