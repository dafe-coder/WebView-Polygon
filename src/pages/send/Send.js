import React from 'react'
import Buttons from './../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import SelectToken from '../../components/SelectToken/SelectToken'
import Amount from './../../components/Amount/Amount'
import Modal from '../../components/modal/Modal'
import BoxWithIcon from '../../components/BoxWithIcon/BoxWithIcon'
import styles from './sent.module.css'
import cn from 'classnames'
import Par from './../../components/Par/Par'
import PaymentDetails from '../../components/PaymentDetails/PaymentDetails'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import Lang from '../../components/Lang/Lang'
import Spinner from '../../components/Loader/Spinner'
import transactionsSend from '../../Func.wallet/transaction'
import { useNavigate, useLocation } from 'react-router-dom'
import CryptoJS  from 'crypto-js';
import { setChooseCoinOne } from '../../store/slices/transactionSlice'

export const Send = () => {
	const {state} = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { walletAddress } = useSelector((state) => state.wallet)
	const { dataUser, currentAccount} = useSelector((state) => state.storage)
	const {chooseCoinOne} = useSelector(state => state.transaction)
	const [disabledBtn, setDisabledBtn] = React.useState(true)
	const [address, setAddress] = React.useState('')
	const [amount, setAmount] = React.useState('')
	const [showPaymentsDetails, setShowPaymentsDetails] = React.useState(false)
	const [checkEther, setCheckEther] = React.useState(false)
	const [openSuccess, setOpenSuccess] = React.useState(false)
	const [openGas, setOpenGas] = React.useState(false)
	const [hash, setHash] = React.useState('')
    const [loading, setLoading] = React.useState(false)
	const [addressTo, setAddressTo] = React.useState('')

	React.useEffect(() => {
		console.log(hash)
	}, [hash])

	React.useEffect(() => {
		if (chooseCoinOne !== null) {
			setCheckEther(chooseCoinOne.symbol.toUpperCase().includes('ETH'))
		}
	}, [chooseCoinOne])

	React.useEffect(() => {
		if(state !== null) {
			dispatch(setChooseCoinOne(state))
		}
	}, [state])

	React.useEffect(() => {
		if (addressTo !== '' && amount !== '' && chooseCoinOne !== null) {
			setShowPaymentsDetails(true)
			setDisabledBtn(false)
		} else {
			setDisabledBtn(true)
			setShowPaymentsDetails(false)
		}
	}, [addressTo, amount, chooseCoinOne])

    const viewDetails = () => {
		window.open(`https://etherscan.io/tx/${hash}`)
	}

	const onSendTransaction = () => {
		const privateKey = CryptoJS.AES.decrypt(dataUser.find((d) => d.name == currentAccount)
		.privateKey, process.env.REACT_APP_KEY).toString(CryptoJS.enc.Utf8)
		const amountSend = Number(amount)
		transactionsSend(
			walletAddress,
			addressTo,
			chooseCoinOne.contract_address,
			amountSend.toString(),
			checkEther,
			setHash,
			setOpenSuccess,
			setOpenGas,
			privateKey
		)
	}

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons onClick={() => navigate(-1)} type='back' />
						<Title>
							<Lang eng='Sent' cny='发送' />
						</Title>
						<div></div>
					</div>
					<SelectToken
						chooseCoin='one'
					/>
					<div className='wallet-input'>
						<input
							className='input'
							type='text'
							id='address'
							required={true}
							value={addressTo}
							onChange={(e) => setAddressTo(e.target.value)}
						/>
						<label className='label' htmlFor='address'>
							<Lang eng='Enter Address' cny='输入地址' />
						</label>
					</div>
					<Amount setAmount={setAmount} amount={amount}/>
					{chooseCoinOne != null ? (
						<PaymentDetails
							pageCurrent='Sent'
							receiver={addressTo}
							data={chooseCoinOne}
							amount={amount}
						/>
					) : (
						<></>
					)}
				</div>
				<div className='wallet-bottom'>
					<Button
						style={{ position: 'relative', minHeight: '52px' }}
						className={cn('btn', {
							['disabled']: disabledBtn == true,
						})}
						type='primary'
						onClick={onSendTransaction}>
						{loading ? <Spinner /> : <Lang eng='Next' cny='下一个' />}
					</Button>
				</div>
			</div>
			<Modal padding='20' open={openSuccess}>
				<BoxWithIcon style={{ margin: '0' }}>
					<Title>
						<Lang eng='TX Result' cny='发送结果' />
					</Title>
					<svg
						style={{ marginTop: '20px', marginBottom: '20px' }}
						width='94'
						height='94'
						viewBox='0 0 94 94'
						fill='#4C9540'
						xmlns='http://www.w3.org/2000/svg'>
						<rect opacity='0.1' width='94' height='94' rx='47' fill='#4C9540' />
						<path
							opacity='0.9'
							d='M62.0469 36.9531C62.9609 37.7969 62.9609 39.2734 62.0469 40.1172L44.0469 58.1172C43.2031 59.0312 41.7266 59.0312 40.8828 58.1172L31.8828 49.1172C30.9688 48.2734 30.9688 46.7969 31.8828 45.9531C32.7266 45.0391 34.2031 45.0391 35.0469 45.9531L42.4297 53.3359L58.8828 36.9531C59.7266 36.0391 61.2031 36.0391 62.0469 36.9531Z'
						/>
					</svg>
					<Title color='dark' mb='0'>
						<Lang eng='Request sent' cny='已发送请求' />
					</Title>
					<Par>
						<Lang eng='Pending block validation...' cny='等待区块验证...' />
					</Par>
					<div className={styles.sent_btn}>
						<button
							onClick={viewDetails}
							className={cn(styles.transparent, styles.btn)}>
							<Lang eng='View Details' cny='查看详情' />
						</button>
						<button
							onClick={() => setOpenSuccess(false)}
							className={cn(styles.primary, styles.btn)}>
							<Lang eng='Got it' cny='知道了' />
						</button>
					</div>
				</BoxWithIcon>
			</Modal>
			<Modal padding='20' open={openGas}>
				<BoxWithIcon style={{ margin: '0' }}>
					<Title>
						<Lang eng='TX Result' cny='发送结果' />
					</Title>
					<svg
						style={{ marginTop: '20px' }}
						width='95'
						height='94'
						viewBox='0 0 95 94'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<rect
							opacity='0.1'
							x='0.5'
							width='94'
							height='94'
							rx='47'
							fill='#F04848'
						/>
						<path
							opacity='0.9'
							d='M65.0781 57.8203L50.1016 32.2266C48.9062 30.2578 46.0234 30.2578 44.8984 32.2266L29.8516 57.8203C28.7266 59.7891 30.1328 62.25 32.4531 62.25H62.4766C64.7969 62.25 66.2031 59.7891 65.0781 57.8203ZM45.8125 40.3125C45.8125 39.3984 46.5156 38.625 47.5 38.625C48.4141 38.625 49.1875 39.3984 49.1875 40.3125V49.3125C49.1875 50.2969 48.4141 51 47.5 51C46.6562 51 45.8125 50.2969 45.8125 49.3125V40.3125ZM47.5 57.75C46.2344 57.75 45.25 56.7656 45.25 55.5703C45.25 54.375 46.2344 53.3906 47.5 53.3906C48.6953 53.3906 49.6797 54.375 49.6797 55.5703C49.6797 56.7656 48.6953 57.75 47.5 57.75Z'
							fill='#F04848'
						/>
					</svg>

					<Title color='dark' mb='0'>
						<Lang eng='Insufficient funds' cny='不充足的资金' />
					</Title>
					<Par>
						<Lang
							eng='Not enough funds for the gas fee'
							cny='没有足够的资金支付汽油费'
						/>
					</Par>
					<div className={styles.sent_btn}>
						<button
							onClick={() => setOpenGas(false)}
							className={cn(styles.btn, styles.btn_error)}>
							<Lang eng='Take me back' cny='带我回去' />
						</button>
					</div>
				</BoxWithIcon>
			</Modal>
		</section>
	)
}
