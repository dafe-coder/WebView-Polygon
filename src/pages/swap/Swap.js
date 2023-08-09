import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Buttons from './../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import SelectToken from './../../components/SelectToken/SelectToken'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SwapInput from '../../components/SwapInput/SwapInput'
import Button from './../../components/Button/Button'
import Svg from './../../svgs/Svg'
import PaymentDetails from './../../components/PaymentDetails/PaymentDetails'
import Spinner from '../../components/Loader/Spinner'
import Modal from '../../components/modal/Modal'
import BoxWithIcon from '../../components/BoxWithIcon/BoxWithIcon'
import Lang from '../../components/Lang/Lang'
import Par from '../../components/Par/Par'
import styles from './swap.module.css'
import { setChooseCoinOne, setChooseCoinTwo } from '../../store/slices/transactionSlice'
import fixNum from '../../Func.wallet/fixNum'
import { useLocation, useNavigate } from 'react-router-dom'

export const Swap = () => {
	const {state} = useLocation()
    const navigate = useNavigate()
	const dispatch = useDispatch()
	const { chooseCoinOne, chooseCoinTwo } = useSelector(
		(state) => state.transaction
	)
	const { allCoins } = useSelector(
		(state) => state.wallet
	)
	const [openModal, setOpenModal] = useState(false)
	const [gasValid, setGasValid] = useState(true)
	const [spinner, setSpinner] = useState(false)
	const [showBtn, setShowBtn] = useState(false)
	const [showGas, setShowGas] = useState(null)
    const [value, setValue] = useState('')
	const [value2, setValue2] = useState('')


	React.useEffect(() => {
		if(state !== null) {
			dispatch(setChooseCoinOne(state))
		}
	}, [state])

	const onSubmitSwap = () => {
		if (
			allCoins !== null &&
			allCoins.length >= 1 
		) {
			setSpinner(true)

			let filtered = allCoins.filter(
				(item) => item.symbol.toUpperCase() == 'ETH'
			)
			let filtered2 = allCoins.filter(
				(item) => item.symbol.toUpperCase() == 'MATIC'
			)
			// filtered2[0].market_data &&
			// filtered2[0].market_data.balance_crypto.usd >= 5
			if (
				filtered[0] &&
				filtered[0].market_data &&
				filtered[0].market_data.balance_crypto.usd >= 5
			) {
				setTimeout(() => {
					setShowGas(false)
					setOpenModal(true)
					setGasValid(true)
					setSpinner(false)
				}, 3000)
			} else {
				setTimeout(() => {
					setGasValid(false)
					setShowGas(true)
					setSpinner(false)
				}, 3000)
			}
		} else {
			setTimeout(() => {
				setShowGas(true)
				setGasValid(false)
				setSpinner(false)
			}, 3000)
		}
	}
	useEffect(() => {
		if (value !== '' && value2 !== '') {
			setShowBtn(true)
		} else {
			setShowBtn(false)
		}
	}, [value, value2])

	const onSwapOrder = () => {
		if (chooseCoinOne !== null && chooseCoinTwo !== null) {
			let order1 = chooseCoinOne
			let order2 = chooseCoinTwo
			dispatch(setChooseCoinOne(order2))
			dispatch(setChooseCoinTwo(order1))
		}
	}

    const viewDetails = () => {
		window.open(`https://etherscan.io/tx/${hash}`)
	}

	return (
		<section className='bg-white' style={{ width: '100%', height: '100%' }}>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons type='back' onClick={() => navigate(-1)} />
						<Title>
							<Lang eng='Swap' cny='交换' />{' '}
							<span style={{ fontWeight: 300 }}>(Polygon)</span>
						</Title>
						<Buttons
							type='cog'
							onClick={() => navigate('/transaction-settings')}
						/>
					</div>
					<SelectToken
						chooseCoin='one'
						noSubtitle
					/>
					<SwapInput
						type='sell'
						setValue={setValue} setValue2={setValue2} value={value} value2={value2}
					/>
					<button className='swap-btn' onClick={onSwapOrder}>
						<Svg type='swap-vertical' />
					</button>
					<SelectToken
                        chooseCoin='two'
						noSubtitle
					/>
					<SwapInput type='buy' setValue={setValue} setValue2={setValue2} value={value} value2={value2} />
					{chooseCoinOne != null && chooseCoinTwo != null ? (
						<PaymentDetails
							pageCurrent='Swap'
							data={[chooseCoinOne, chooseCoinTwo]}
						/>
					) : (
						<></>
					)}
				</div>
				<div className='wallet-bottom'>
					<Button
						onClick={onSubmitSwap}
						type='primary'
						style={{ position: 'relative', minHeight: '54px' }}
						positionSvg='left'
						className={cn({
							['disabled']: showBtn == false,
							['gas_error']:
								gasValid == false && showBtn == true && showGas == true,
						})}>
						{(gasValid == false) || spinner == true ? (
							<></>
						) : (
							<Svg type='swap' />
						)}
						{spinner ? (
							<Spinner />
						) : gasValid == false ? (
							<Lang eng='Insufficient funds' cny='不充足的资金' />
						) : (
							<Lang eng='Swap' cny='交换' />
						)}
					</Button>
					<div className='swap-prices'>
						<p>
							{chooseCoinOne != null
								? chooseCoinOne.symbol.toUpperCase() + ' = '
								: ''}{' '}
							{chooseCoinTwo != null
								? fixNum(chooseCoinTwo.market_data.current_price) + ' USD'
								: ''}
						</p>
						<p>
							{chooseCoinTwo != null
								? chooseCoinTwo.symbol.toUpperCase() + ' = '
								: ''}{' '}
							{chooseCoinTwo != null
								? fixNum(chooseCoinTwo.market_data.current_price) + ' USD'
								: ''}
						</p>
					</div>
				</div>
			</div>
			<Modal padding='20' open={openModal}>
				<BoxWithIcon style={{ margin: '0' }}>
					<Title>
						<Lang eng='TX Result' cny='发送结果' />
					</Title>
					<svg
						style={{ marginTop: '20px', marginBottom: '20px' }}
						width='94'
						height='94'
						viewBox='0 0 94 94'
						fill='#009393'
						xmlns='http://www.w3.org/2000/svg'>
						<rect opacity='0.1' width='94' height='94' rx='47' fill='#009393' />
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
							onClick={() => setOpenModal(false)}
							className={cn(styles.primary, styles.btn)}>
							<Lang eng='Got it' cny='知道了' />
						</button>
					</div>
				</BoxWithIcon>
			</Modal>
		</section>
	)
}
