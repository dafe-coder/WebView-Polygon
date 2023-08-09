import React from 'react'
import Title from '../../components/Title/Title'
import RestoreCountWords from '../../components/RestoreCountWordsList/RestoreCountWords'
import GoBack from '../../components/GoBack/GoBack'
import WalletLogo from './wallet.png'
import Lang from '../../components/Lang/Lang'
import { useLocation } from 'react-router-dom';

export const ImportRestore = () => {
	const {state} = useLocation()
	return (
		<section className='bg-white'>
			<GoBack to={state !== null && state.from == 'welcomeBack' ? '/' : ''} />
			<Title mt>
				<Lang eng='Restore Wallet' cny='恢复钱包' />
			</Title>
			<div className='wallet_body'>
				<div
					className='wallet_body__top'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<img
						src={WalletLogo}
						alt=''
						style={{ width: '75px', height: '75px' }}
					/>
				</div>
				<div className='wallet-body__bottom' style={{ marginTop: '30px', flex: 1 }}>
					<RestoreCountWords />
				</div>
			</div>
		</section>
	)
}