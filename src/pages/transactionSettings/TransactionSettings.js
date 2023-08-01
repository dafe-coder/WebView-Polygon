import React, { useState, useEffect } from 'react'
import Title from './../../components/Title/Title'
import Buttons from './../../components/Buttons/Buttons'
import Svg from './../../svgs/Svg'
import styles from './transaction-settings.module.css'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setSlippage, setDeadline } from '../../store/slices/transactionSlice'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'

export const TransactionSettings = () => {
    const navigate = useNavigate()
	const { slippage, deadline  } = useSelector(
		(state) => state.transaction
	)
    const {lang} = useSelector(state => state.storage)
	const dispatch = useDispatch()
	const [isShow, setIsShown] = useState()
	const [valuePercent, setValuePercent] = useState('')
	const [valuePercentValid, setValuePercentValid] = useState(null)
	const [chooseSlippage, setChooseSlippage] = useState('2%')

	const onShowTooltip = (item) => {
		setIsShown(item)
	}
	useEffect(() => {
		if (slippage != null && slippage.type == 'own') {
			setChooseSlippage(slippage.type)
			setValuePercent(slippage.value)
		} else if (slippage != null) {
			setChooseSlippage(slippage.type)
		}
	}, [slippage])

	const onTypePercent = (e) => {
		if (e.target.value.length <= 2) {
			setValuePercent(e.target.value)
			if (Number(e.target.value) <= 45 && Number(e.target.value) >= 1) {
				dispatch(setSlippage({ value: e.target.value, type: 'own' }))
				setValuePercentValid(true)
			} else {
				setValuePercentValid(false)
			}
		}
	}
	const onChoosePercent = (value) => {
		let percent = 0
		if (value == '2%') {
			percent = 2
		} else if (value == '3%') {
			percent = 3
		} else if (value == 'own') {
			percent = valuePercent
		}
		setChooseSlippage(value)
		dispatch(setSlippage({ value: percent, type: value }))
	}

	const onChooseDeadline = (value) => {
		if(value < 100) {
			dispatch(setDeadline(value))
		}
	}

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons type='back' onClick={() => navigate(-1)} />
						<Title>
							<Lang eng='Transaction Settings' cny='交易设置' />
						</Title>
						<div></div>
					</div>
				</div>
				<div className='wallet-bottom'>
					<div className={styles.list_body}>
						<p>
							<Lang eng='Slippage tolerance' cny='滑动公差' />{' '}
							<button
								className={styles.button}
								onMouseLeave={() => onShowTooltip('')}
								onMouseEnter={() => onShowTooltip('slippage')}>
								<Svg type='questions' />
								<div
									className={styles.tooltip}
									style={
										isShow == 'slippage'
											? { display: 'block' }
											: { display: 'none' }
									}>
									<Lang
										eng='Your request will be denied if the price changes more than
									this percentage.'
										cny='如果价格变化超过此百分比，您的请求将被拒绝。'
									/>
								</div>
							</button>
						</p>
						<ul className={styles.list}>
							<li
								className={cn({ [styles.active]: chooseSlippage == '2%' })}
								onClick={() => onChoosePercent('2%')}>
								2%
							</li>
							<li
								className={cn({ [styles.active]: chooseSlippage == '3%' })}
								onClick={() => onChoosePercent('3%')}>
								3%
							</li>
							<li
								className={cn(styles.custom, {
									[styles.active]: chooseSlippage == 'own',
									[styles.error]:
										valuePercentValid == false && chooseSlippage == 'own',
								})}>
								<input
									onFocus={() => onChoosePercent('own')}
									onChange={(e) => onTypePercent(e)}
									type='number'
									placeholder={(<Lang eng='Custom' cny='风俗' />).props[lang]}
									value={valuePercent}
								/>
							</li>
						</ul>
						<p
							className={cn(styles.par, {
								[styles.orange]:
									Number(valuePercent) >= 1 && Number(valuePercent) <= 15,
								[styles.danger]:
									Number(valuePercent) > 15 && Number(valuePercent) <= 45,
							})}>
							{valuePercent.length >= 1 &&
							Number(valuePercent) <= 45 &&
							Number(valuePercent) >= 1 &&
							chooseSlippage == 'own' ? (
								<button className={styles.button} style={{ cursor: 'default' }}>
									<Svg type='info' />
								</button>
							) : (
								<></>
							)}
							{valuePercent.length >= 1 && chooseSlippage == 'own' ? (
								Number(valuePercent) <= 15 && Number(valuePercent) >= 1 ? (
									<Lang
										eng='Your transaction may be frontrun'
										cny='您的交易可能是抢先交易'
									/>
								) : Number(valuePercent) <= 45 && Number(valuePercent) > 15 ? (
									<Lang
										eng='You may receive 45% less with this level of slippage tolerance'
										cny='在这种水平的滑点容忍度下，您可能会少收到 45%'
									/>
								) : (
									''
								)
							) : (
								''
							)}
						</p>
					</div>
					<div className={styles.list_body} style={{ marginTop: '35px' }}>
						<p>
							<Lang eng='Transaction deadline' cny='交易截止日期' />{' '}
							<button
								onMouseLeave={() => onShowTooltip('')}
								onMouseEnter={() => onShowTooltip('deadline')}
								className={styles.button}>
								<Svg type='questions' />
								<div
									className={styles.tooltip}
									style={
										isShow == 'deadline'
											? { display: 'block' }
											: { display: 'none' }
									}>
									<Lang
										eng='Your request will be denied if the duration expires.'
										cny='如果期限届满，您的请求将被拒绝。'
									/>
								</div>
							</button>
						</p>
						<div className={styles.input}>
							<input
								onChange={(e) => onChooseDeadline(e.target.value)}
								type='number'
								value={deadline}
							/>
							<span>
								<Lang eng='min' cny='分钟' />
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
