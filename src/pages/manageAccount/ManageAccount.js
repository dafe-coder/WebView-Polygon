import React, { useEffect, useState } from 'react'
import Buttons from './../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import AccountCard from '../../components/AccountCard/AccountCard'
import Button from './../../components/Button/Button'
import Svg from '../../svgs/Svg'
import { useDispatch, useSelector } from 'react-redux'
import Lang from '../../components/Lang/Lang'
import Modal from './../../components/modal/Modal'
import CryptoJS from 'crypto-js'
import { setTimer, setDeleteWallet, resetWallet } from '../../store/slices/storageSlice'
import { useNavigate } from 'react-router-dom'

export const ManageAccount = () => {
    const navigate = useNavigate()
	const kitkat = process.env.REACT_APP_KEY
	const dispatch = useDispatch()
    const {currentAccount, dataUser} = useSelector(state => state.storage)

	const [data, setData] = useState(undefined)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
        if (dataUser !== null && dataUser.length >= 1) {
            setData(dataUser.find(item => item.name === currentAccount))
        }
	}, [])
    
	const onDelete = () => {
        if(dataUser !== null && dataUser.length >= 2) {
            dispatch(setDeleteWallet(currentAccount))
            navigate('/accounts')
        } else {
            dispatch(resetWallet())
            navigate('/')
        }
	}

	const deleteAcc = () => {
		setOpenModal(true)
	}

	const onLock = () => {
		dispatch(setTimer(null))
		navigate('/welcome-back')
	}

	return (
		<section className='bg-white'>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate('/accounts')}
							type='back'></Buttons>
						<Title>
							<Lang eng='Account' cny='帐户' />
						</Title>
						<Buttons type='lock' onClick={onLock}>
							<Lang eng='Lock' cny='锁' />
						</Buttons>
					</div>
					<AccountCard
						title={data ? data.name : 'Wallet'}
						copy={true}
						one={true}>
						{data && data.address !== ''
							&& data.address}
					</AccountCard>
					{data && data.phrase != '' ? (
						<Button text='left' type='border-primary' mt onClick={() => navigate('/seed-phrase')}>
							<Lang eng='View recovery phrase' cny='查看恢复短语' />
						</Button>
					) : (
						<></>
					)}
					<Button text='left' type='border-primary' mt onClick={() => navigate('/private-key')}>
						<Lang eng='View private key' cny='查看私钥' />
					</Button>
				</div>
				<div className='wallet-bottom' style={{ marginTop: '20px' }}>
					<Button onClick={deleteAcc} type='border-error' positionSvg='left' mt>
						<Svg type='trash' />
						<Lang eng='Delete Wallet' cny='删除钱包' />
					</Button>
				</div>
			</div>
			<Modal openFunc={setOpenModal} open={openModal}>
				<Title>Did you back up the mnemonic phrase?</Title>
				<Button onClick={onDelete} mt='0' type='primary'>
					Yes
				</Button>
				<span
					onClick={() => setOpenModal(false)}
					style={{
						cursor: 'pointer',
						fontWeight: 600,
						fontSize: '14px',
						lineHeight: '20px',
						color: '#4F33A3',
						marginTop: '20px',
					}}>
					No, take me back
				</span>
			</Modal>
		</section>
	)
}