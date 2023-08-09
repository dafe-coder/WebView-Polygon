import React from 'react'
import Buttons from '../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import BoxWithIcon from './../../components/BoxWithIcon/BoxWithIcon'
import Button from './../../components/Button/Button'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import LogoWallet from '../../static/assets/logo.png'
import manifestVersion from '../../../package.json'

export const About = () => {
    const navigate = useNavigate()
    
	const openHelp = (link) => {
		window.open(link)
	}
	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate(-1)}
							type='back'
						/>
						<Title>
							<Lang eng='About' cny='关于' />
						</Title>
						<div></div>
					</div>
					<BoxWithIcon
						style={{ marginBottom: '30px' }}
						title={<Lang eng='USDT Wallet' cny='系绳钱包' />}
						par={manifestVersion.version}
						colorPar='dark-gray'>
						<img width={50} height={50} src={LogoWallet} style={{marginBottom: 20}}/>
					</BoxWithIcon>
					<Button
						type='border-gray'
						text='left'
						mt='0'
						onClick={() => openHelp(process.env.REACT_APP_HELP_URL)}>
						<Lang eng='Help' cny='帮助' />
					</Button>
				</div>
				<div className='wallet-bottom'></div>
			</div>
		</section>
	)
}