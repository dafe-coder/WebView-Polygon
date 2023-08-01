import React, { useState } from 'react'
import cn from 'classnames'
import Title from '../../components/Title/Title'
import Buttons from '../../components/Buttons/Buttons'
import Button from '../../components/Button/Button'
import SelectBuy from '../../components/SelectBuy/SelectBuy'
import SelectCurrency from '../../components/SelectBuy/SelectCurrency'
import Lang from '../../components/Lang/Lang'
import {useNavigate} from 'react-router-dom'

export const Buy = () => {
    const navigate = useNavigate()
	const [validCurrency, setValidCurrency] = useState(false)
	const [validToken, setValidToken] = useState(false)

    const goPay = () => {
		if (validCurrency && validToken) {
			window.open('https://www.moonpay.com/buy')
		}
	}

	return (
		<section className='bg-white'>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate(-1)}
							type='back'></Buttons>
						<Title>
							<Lang eng='Buy Crypto' cny='购买加密货币' />
						</Title>
						<div></div>
					</div>
					<SelectCurrency setValidCurrency={setValidCurrency} />
					<SelectBuy setValidToken={setValidToken} />
				</div>
				<div className='wallet-bottom'>
					<Button
						type='primary'
						className={cn('btn', {
							['disabled']: validCurrency == false || validToken == false,
						})}
						onClick={() => goPay()}>
						<Lang eng='Continue' cny='继续' />
					</Button>
				</div>
			</div>
		</section>
	)
}
