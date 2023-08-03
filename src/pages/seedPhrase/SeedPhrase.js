import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Buttons from '../../components/Buttons/Buttons'
import Title from '../../components/Title/Title'
import Par from '../../components/Par/Par'
import Alert from './../../components/Alert/Alert'
import SeedPhraseBox from '../../components/SeedPhrase/SeedPhrase'
import Lang from '../../components/Lang/Lang'
import { useNavigate } from 'react-router-dom'
import { PincodeConfirm } from '../../components/Pincode/PincodeConfirm'

export const SeedPhrase = () => {
    const navigate = useNavigate()
	const [showPhrase, setShowPhrase] = useState(false)

	const onSubmitSeed = () => {
	
	}
	return (
		<section className='bg-white'>
			<div className='wallet_body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons onClick={() => navigate(-1)} type='back' />
						<Title>
							<Lang eng='Seed Phrase' cny='种子短语' />
						</Title>
						<div></div>
					</div>
					<Par>
						<Lang
							eng='	If you ever change browsers or move computers, you will need this
						seed phrase to access your accounts. Save them somewhere safe and
						secret.'
							cny='如果您曾经更换浏览器或移动计算机，您将需要这个助记词来访问您的帐户。 将它们保存在安全和秘密的地方。'
						/>
					</Par>
					<Alert
						title={
							<Lang eng='Keep Mnemonic Phrase Safe!' cny='保持助记词安全！' />
						}
						danger={true}
						style={{ margin: '20px 0' }}>
						<Lang
							eng='Do not share this phrase with anyone! These words can be used to
						steal all of your accounts.'
							cny='不要与任何人分享这句话！ 这些词可用于窃取您的所有帐户。'
						/>
					</Alert>
					{showPhrase ? (
						<></>
					) : (
						<PincodeConfirm setValid={setShowPhrase}/>
					)}
					<SeedPhraseBox show={showPhrase} />
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
