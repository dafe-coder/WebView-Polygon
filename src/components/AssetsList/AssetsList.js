import React, { useEffect, useState } from 'react'
import styles from './assets-list.module.css'
import AssetsItem from './../AssetsItem/AssetsItem'
import { useSelector } from 'react-redux'

const AssetsList = ({ dataTokens, value, setLengthChoose }) => {
	const { loginUser } = useSelector((state) => state.wallet)
	const [dataTokensFiltered, setDataTokensFiltered] = useState([])
	const [dataChooseTokens, setDataChooseTokens] = useState([])
	const [shortChoose, setShortChoose] = useState([])

	useEffect(() => {
		dataTokens && dataTokens.length
			? chrome.storage.local.get(['userData'], function (result) {
					if (result.userData && result.userData.length >= 1) {
						result.userData.map((item) => {
							if (loginUser == item.name) {
								if (item.chooseAssets.length >= 1) {
									setShortChoose(item.chooseAssets)
									let dataOld = dataTokens
									let dataNew = dataOld.map((itemOld) => {
										if (item.chooseAssets.includes(itemOld.id)) {
											itemOld.currentActive = true
										}
										return itemOld
									})
									setDataChooseTokens(dataNew)
									setDataTokensFiltered(dataNew)
								}
							}
						})
					}
			  })
			: null
	}, [dataTokens])

	useEffect(() => {
		setDataTokensFiltered(dataChooseTokens)
	}, [dataChooseTokens])

	useEffect(() => {
		setLengthChoose(shortChoose.length)
	}, [shortChoose])

	useEffect(() => {
		if (value != '' && dataTokens) {
			setDataChooseTokens(
				dataTokens.filter(
					(item) => item.name.toLowerCase().indexOf(value.toLowerCase()) != -1
				)
			)
		}
		setDataTokensFiltered(dataChooseTokens)
	}, [value])

	const onChooseAssets = (itemId) => {
		let dataElem = dataChooseTokens.filter((item) => itemId == item.id)
		setShortChoose((state) => {
			if (state.length && state.includes(dataElem[0].id)) {
				dataElem[0].currentActive = false
				return state.filter((item) => item != dataElem[0].id)
			} else {
				dataElem[0].currentActive = true
				return [...state, dataElem[0].id]
			}
		})
		chrome.storage.local.get(['userData'], function (result) {
			if (result.userData && result.userData.length >= 1) {
				result.userData.map((item) => {
					if (loginUser == item.name) {
						let newArrAccounts = result.userData.filter(
							(item) => item.name != loginUser
						)
						if (item.chooseAssets && item.chooseAssets.length >= 1) {
							if (item.chooseAssets.includes(dataElem[0].id)) {
								item.chooseAssets = shortChoose.filter(
									(item) => item != dataElem[0].id
								)
								setDataTokensFiltered([
									...dataChooseTokens.filter(
										(item) => item.id != dataElem[0].id
									),
								])
							} else {
								item.chooseAssets = [...shortChoose, dataElem[0].id]
								setDataTokensFiltered([
									...dataChooseTokens.filter(
										(item) => item.id != dataElem[0].id
									),
									dataElem[0],
								])
							}
						} else {
							item.chooseAssets = [dataElem[0].id]
						}
						chrome.storage.local.set({
							userData: [...newArrAccounts, item],
						})
					}
				})
			}
		})
	}
	return (
		<ul className={styles.list}>
			{value.length >= 1 && dataChooseTokens.length >= 1
				? dataChooseTokens.map((item) => (
						<AssetsItem
							id={item.id}
							onChooseAssets={onChooseAssets}
							key={item.id}
							cryptoImg={item.image.thumb}
							cryptoName={item.name}
							currentActive={item.currentActive}
						/>
				  ))
				: dataTokensFiltered.length
				? dataTokensFiltered.map((item) => {
						if (item.currentActive == true) {
							return (
								<AssetsItem
									id={item.id || item[0].id}
									onChooseAssets={onChooseAssets}
									key={item.id || item[0].id}
									cryptoImg={item.image.thumb || item[0].image.thumb}
									cryptoName={item.name || item[0].name}
									currentActive={item.currentActive || item[0].currentActive}
								/>
							)
						}
				  })
				: null}
		</ul>
	)
}

export default AssetsList
