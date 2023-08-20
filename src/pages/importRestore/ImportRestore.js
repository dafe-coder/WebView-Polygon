import React from 'react'
import Title from '../../components/Title/Title'
import RestoreCountWords from '../../components/RestoreCountWordsList/RestoreCountWords'
import GoBack from '../../components/GoBack/GoBack'
import WalletLogo from '../../static/assets/images/logo.png'
import Lang from '../../components/Lang/Lang'

export const ImportRestore = () => {
	return (
		<section>
			<GoBack fill='white' goTo='Home' backAccount />
			<Title color='white' mt>
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
						style={{ width: '54px', height: '54px' }}
					/>
				</div>
				<div className='wallet-body__bottom' style={{ marginTop: 30, flexGrow: 1 }}>
					<RestoreCountWords />
				</div>
			</div>
		</section>
	)
}