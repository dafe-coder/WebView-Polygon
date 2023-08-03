import React, { useState } from 'react'
import cn from 'classnames'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import styles from './welcome-back.module.css'
import Modal from '../../components/modal/Modal'
import Par from './../../components/Par/Par'
import bgImage from './Frame.png'
import { useDispatch, useSelector } from 'react-redux'
import { logTimer } from '../../Func.wallet/logTimer'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import { resetWallet, setIsLogin } from '../../store/slices/storageSlice'
import { PincodeConfirm } from '../../components/Pincode/PincodeConfirm';

const WelcomeBack = () => {
	const dispatch = useDispatch()
    const navigate = useNavigate()
	const { chooseTimeOut } = useSelector((state) => state.storage)
	const [open, setOpen] = useState(false)
	const [goPage, setGoPage] = useState(false)
	const [activeBtn, setActiveBtn] = useState(false)
	const [timer, setTimer] = useState(10)
	const [timerIDs, setTimerIDs] = useState(null)
	const [validPass, setValidPass] = React.useState(false)
//
    
	const logIn = () => {
       
	}

	React.useEffect(() => {
		console.log(validPass);
		if(validPass) {
            logTimer(chooseTimeOut, dispatch)
            navigate('/wallet')
		}
	}, [validPass])

	const goDeleteWallets = (page) => {
		setOpen(true)
		setTimer(10)
		setActiveBtn(false)
		setTimerIDs(setInterval(timerDisabled, 1000))
		function timerDisabled() {
			setTimer((state) => {
				if (state == 0) {
					setActiveBtn(true)
					clearInterval(timerIDs)
					return 0
				} else {
					return state - 1
				}
			})
		}
		if (page == 'import') {
			setGoPage('WalletRestore')
		} else {
			setGoPage('CreateWalletReg')
		}
	}

	const onDeleteAllAccounts = () => {
		if (timer == 0 && activeBtn == true) {
			dispatch(resetWallet())
            dispatch(setIsLogin(false))
			if (goPage === 'WalletRestore') {
				navigate('/import', {state: {from: 'welcomeBack'}})
			} else {
				navigate('/create-data', {state: {from: 'welcomeBack'}})
			}
		}
	}

	const onCancel = () => {
		setActiveBtn(true)
		clearInterval(timerIDs)
		setOpen(false)
	}

	return (
		<section>
			<div className='wallet_body'>
				<div className={styles.top}>
					<img src={bgImage} alt='wallet logo' />
				</div>
				<div className={styles.bottom}>
					<Title color='white' mt>
						<Lang eng='Welcome back' cny='欢迎回来' />
					</Title>
					<form style={{ width: '100%' }}>
						<PincodeConfirm setValid={setValidPass} />
						<Button type='white' mt onClick={logIn}>
							<Lang eng='Unlock' cny='开锁' />
						</Button>
					</form>
					<div className={styles.reg}>
						<p>
							<Lang eng='Unable to Log in?' cny='无法登入？' />
						</p>
						<a
							style={{ cursor: 'pointer' }}
							onClick={() => goDeleteWallets('import')}>
							<Lang eng='Import' cny='进口' />
						</a>
						<Lang eng='or' cny='或者' />
						<a
							style={{ cursor: 'pointer' }}
							onClick={() => goDeleteWallets('create')}>
							<Lang eng='create a new wallet' cny='创建一个新钱包' />
						</a>
						.
					</div>
				</div>
			</div>
			<Modal open={open} white padding='0'>
				<Title type='error' mb>
					<Lang eng='Risk Alert' cny='风险提示' />
				</Title>
				<Par>
					<Lang
						eng='All your existing wallets will be removed and replaced with the new
					one.'
						cny='您现有的所有钱包都将被移除并替换为新钱包。'
					/>
					<br />
					<br />
					<Lang
						eng='Please make sure you have backed up your mnemonic phrases or private
					keys, otherwise you will not be able to recover the assets in your
					wallets.'
						cny='请确保您已备份助记词或私钥，否则您将无法恢复钱包中的资产。'
					/>
				</Par>
				<Button
					onClick={onDeleteAllAccounts}
					className={cn({ ['disabled']: activeBtn == false })}
					type='primary'
					mt
					style={{ marginTop: '20px' }}>
					<Lang eng='Continue' cny='继续' />{' '}
					{activeBtn == false ? `(${timer} s)` : ''}
				</Button>
				<a
					style={{ cursor: 'pointer' }}
					className='link primary-link'
					onClick={() => onCancel()}>
					<Lang eng='Back' cny='后退' />
				</a>
			</Modal>
		</section>
	)
}
export default WelcomeBack
