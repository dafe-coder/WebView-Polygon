import React, { useEffect } from 'react'
import PortfolioItem from '../PortfolioItem/PortfolioItem'
import LoaderList from '../Loader/LoaderList'

const PortfolioList = ({ className, data,  }) => {
	const [portfolioData, setPortfolioData] = React.useState(null)

	React.useEffect(() => {
		if(data.length) {
			setPortfolioData(data)
		} else {
			setPortfolioData(null)
		}
	}, [data])

	return portfolioData !== null && portfolioData.length ? (
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
									item.market_data.balance > 0
										? item.market_data.balance
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
