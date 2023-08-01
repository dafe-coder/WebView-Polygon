import React, { useEffect, useState } from 'react'
import AssetsSearch from '../../components/AssetsSearch/AssetsSearch'
import Title from './../../components/Title/Title'
import AssetsList from '../../components/AssetsList/AssetsList'
import styles from './manage-assets.module.css'
import Buttons from '../../components/Buttons/Buttons'
import { useSelector } from 'react-redux'
import Lang from '../../components/Lang/Lang'
import {useNavigate} from 'react-router-dom'

export const ManageAssets = () => {
    const navigate = useNavigate()
	const { chooseAssets } = useSelector((state) => state.storage)
	const { allCoins } = useSelector((state) => state.wallet)
	const [value, setValue] = useState([])
	const [length, setLength] = useState(0)

	useEffect(() => {
		setLength(allCoins !== null ? allCoins.length : 0)
	}, [allCoins])

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className={styles.header}>
					<Buttons
						onClick={() => navigate(-1)}
						type='back'></Buttons>
					<Title mt>
						<Lang eng='Assets' cny='资产' /> ({chooseAssets.length}/{length})
					</Title>
					<div></div>
					{/* <Buttons
						type='settings'
						onClick={() => dispatch(setCurrentPage('CustomToken'))}></Buttons> */}
				</div>
				<div className='wallet-top'>
					<AssetsSearch setValue={setValue} value={value} />
				</div>
				<div className='wallet-bottom'>
					<AssetsList
						value={value}
					/>
				</div>
			</div>
		</section>
	)
}