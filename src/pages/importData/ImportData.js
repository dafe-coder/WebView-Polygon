import React from 'react'
import cn from 'classnames'
import RestoreForm from '../../components/RestoreForm/RestoreForm'
import Title from '../../components/Title/Title'
import GoBack from '../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
import { useLocation } from 'react-router-dom'

export const ImportData = () => {
	const {state} = useLocation()
	
	return (
		<section>
			<GoBack goTo='WalletRestore' />
			<Title mt color='white'>
				<Lang eng='Create Wallet' cny='创建钱包' />
			</Title>
			<div className='wallet_body'>
				<RestoreForm countWords={state.walletKey}/>
			</div>
		</section>
	)
}