import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Buttons from '../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import Par from '../../components/Par/Par'
import Alert from '../../components/Alert/Alert'
import Input from '../../components/Input/Input'
import SeedPhraseBox from '../../components/SeedPhrase/SeedPhrase'
import { useDispatch, useSelector } from 'react-redux'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import { setPasswordInit } from '../../store/slices/createSlice'

export const PrivateKey = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
	const { passwordInit } = useSelector((state) => state.create)
	const { password } = useSelector((state) => state.storage)
	const [showPhrase, setShowPhrase] = useState(false)

	const onSubmitSeed = () => {
		if (password.length >= 8) {
            if (password === passwordInit) {
                setShowPhrase(true)
                dispatch(setPasswordInit(''))
            } else {
                dispatch(setPasswordInit(''))
            }
		}
	}
	return (
		<section className='bg-white'>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons onClick={() => navigate(-1)} type='back' />
						<Title>
							<Lang eng='Private Key' cny='私钥' />
						</Title>
						<div></div>
					</div>
					<Par>
						<Lang
							eng='If you ever change browsers or move computers, you will need this
						key to access your accounts. Save them somewhere safe and
						secret.'
							cny='如果您更改浏览器或移动计算机，您将需要此密钥来访问您的帐户。 将它们保存在安全和秘密的地方。'
						/>
					</Par>
					<Alert
						title={<Lang eng='Keep Private Key Safe!' cny='保持私钥安全！' />}
						style={{ margin: '20px 0' }}>
						<Lang
							eng='Do not share this key with anyone! Key can be used to
						steal all of your accounts.'
							cny='不要与任何人共享此密钥！ 密钥可用于窃取您的所有帐户。'
						/>
					</Alert>
					{showPhrase ? (
						<></>
					) : (
						<Input
							label={<Lang eng='password' cny='密码' />}
							id='password-seed'
							type='pass-log'
						/>
					)}
					<SeedPhraseBox show={showPhrase} prKey />
				</div>
				<div className='wallet-bottom'>
					{showPhrase ? (
						<></>
					) : (
						<Button mb type='primary' onClick={onSubmitSeed}>
							<Lang eng='Next' cny='下一个' />
						</Button>
					)}
					<Button mt='0' type='border-primary' onClick={() => navigate(-1)}>
						<Lang eng='Cancel' cny='取消' />
					</Button>
				</div>
			</div>
		</section>
	)
}