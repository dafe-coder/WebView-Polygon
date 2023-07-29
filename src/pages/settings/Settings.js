import React, { useState } from 'react'
import styles from './settings.module.css'
import Buttons from '../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import { useEffect } from 'react'
import Svg from './../../svgs/Svg'
import { useSelector } from 'react-redux/es/exports'
import Lang from '../../components/Lang/Lang'
import Menu from '../../components/Menu/Menu'
import { useNavigate } from 'react-router-dom'
import { setCurrencyWallet } from '../../store/slices/storageSlice'
export const Settings = () => {
	const navigate = useNavigate()
	
	const { langList } = useSelector(
		(state) => state.wallet
	)
    const {dataUser, currentAccount, lang, currencyWallet} = useSelector(state => state.storage)
	const [data, setData] = useState({})

	useEffect(() => {
        if (dataUser && dataUser.length >= 1) {
            dataUser.map((item) => {
                if (currentAccount == item.name) {
                    setData(item)
                }
            })
        }
	}, [])

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate('/wallet')}
							type='back'
						/>
						<Title>
							<Lang eng='Settings' cny='设置' />
						</Title>
						<div></div>
					</div>
				</div>
				<div className='wallet-bottom'>
					<ul className={styles.settings_list}>
						<li onClick={() => navigate('/select-currency')}>
							<span>
								<Lang eng='Currency' cny='货币' />
							</span>
							<span>
								{currencyWallet.toUpperCase() == 'USD' ? (
									<>
										<Lang eng='Default' cny='默认' /> (
										{currencyWallet.toUpperCase()})
									</>
								) : (
									currencyWallet.toUpperCase()
								)}{' '}
								<Svg type='arr-sm-right' />
							</span>
						</li>
						<li onClick={() => navigate('/select-language')}>
							<span>
								<Lang eng='Language' cny='语' />
							</span>
							<span>
								{lang == 'eng' ? (
									<>
										<Lang eng='Default' cny='默认' /> (English){' '}
									</>
								) : (
									langList.filter((item) => item.short == lang)[0].lang
								)}
								<Svg type='arr-sm-right' />
							</span>
						</li>
						<li onClick={() => navigate('/security-privacy')}>
							<Lang eng='Security and Privacy' cny='安全和隐私' />
							<Svg type='arr-sm-right' />
						</li>
						{data.phrase != '' && (
							<li onClick={() => navigate('/seed-phrase')}>
								<Lang eng='View Seed Phrase' cny='查看种子短语' />
								<Svg type='arr-sm-right' />
							</li>
						)}
						<li onClick={() => navigate('/private-key')}>
							<Lang eng='View Private Key' cny='查看私钥' />
							<Svg type='arr-sm-right' />
						</li>
						<li onClick={() => navigate('/about')}>
							<Lang eng='About' cny='关于' />
							<Svg type='arr-sm-right' />
						</li>
					</ul>
				</div>
			</div>
			<Menu />
		</section>
	)
}