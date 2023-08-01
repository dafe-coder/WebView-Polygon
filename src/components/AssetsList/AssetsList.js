import React, { useEffect, useState } from 'react'
import styles from './assets-list.module.css'
import AssetsItem from './../AssetsItem/AssetsItem'
import { useSelector } from 'react-redux'
import {setChooseAssets} from '../../store/slices/storageSlice'
import { useDispatch } from 'react-redux'

const AssetsList = ({ value }) => {
	const dispatch = useDispatch()
	const { chooseAssets } = useSelector((state) => state.storage)
	const { allCoins } = useSelector((state) => state.wallet)
	const [dataTokensFiltered, setDataTokensFiltered] = useState([])
	const [dataChooseTokens, setDataChooseTokens] = useState([])

	
	React.useEffect(() => {
		if (allCoins !== null) {
			setDataChooseTokens(allCoins.filter(item => chooseAssets.includes(item.symbol.toLowerCase())))
		}
	}, [allCoins, chooseAssets])

	useEffect(() => {
		if (value != '' && allCoins !== null) {
			setDataTokensFiltered(
				allCoins.filter(
					(item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.symbol.toLowerCase().includes(value.toLowerCase())
				)
			)
		}
	}, [value, allCoins])

	const onChooseAssets = (symbol) => {
		dispatch(setChooseAssets(symbol))
	}

	return (
		<ul className={styles.list}>
			{value.length < 1 && dataChooseTokens.length >= 1
				? dataChooseTokens.map((item) => (
					<AssetsItem
						symbol={item.symbol}
						onChooseAssets={onChooseAssets}
						key={item.id}
						cryptoImg={item.image.thumb}
						cryptoName={item.name}
						currentActive={chooseAssets.includes(item.symbol)}
					/>
				  ))
				: dataTokensFiltered.length
				? dataTokensFiltered.map((item) => (
						<AssetsItem
							symbol={item.symbol}
							onChooseAssets={onChooseAssets}
							key={item.id}
							cryptoImg={item.image.thumb}
							cryptoName={item.name}
							currentActive={chooseAssets.includes(item.symbol)}
						/>
					))
				: null}
		</ul>
	)
}

export default AssetsList
