export function rebuildObjPortfolio(list) {
	const newList = list.map((obj, i) => {
		return {
			id: i,
			name: obj.attributes.fungible_info.name,
			symbol: obj.attributes.fungible_info.symbol,
			contract_address: obj.relationships.fungible.data.id,
			decimals: obj.attributes.quantity.decimals,
			market_data: {
				current_price: obj.attributes.price,
				balance: obj.attributes.quantity.float,
				balance_crypto: obj.attributes.value,
				chain: obj.relationships.chain.data.id,
			},
			changes: {
				absolute: obj.attributes.changes.absolute_1d,
				percent: obj.attributes.changes.percent_1d,
			},
			image: {
				thumb:
					obj.attributes.fungible_info.icon &&
					obj.attributes.fungible_info.icon.url,
			},
		};
	});
	return newList;
}
export function rebuildObjPortfolioDefaultCoins(list) {
	const newList = list.map((obj) => {
		return {
			id: obj.id,
			name: obj.name,
			symbol: obj.symbol,
			contract_address: '',
			market_data: {
				current_price: obj.current_price,
				balance: 0,
				balance_crypto: 0,
				chain: '',
			},
			changes: {
				absolute: obj.price_change_24h,
				percent: obj.price_change_percentage_24h,
			},
			image: {
				thumb: obj.image,
			},
		};
	});
	return newList;
}
