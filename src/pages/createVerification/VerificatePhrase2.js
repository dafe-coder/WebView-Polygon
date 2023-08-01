import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import PhraseBox from '../../components/PhraseBox/PhraseBox'
import { useSelector, useDispatch} from 'react-redux'
import GoBack from '../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
import { setWord2 } from '../../store/slices/createSlice'
import { useNavigate } from 'react-router-dom'

export const VerificatePhrase2 = () => {
	const { word2, countVerification } = useSelector((state) => state.create)
	const navigate = useNavigate()

	const goToNextPage = () => {
		if (word2 !== '') {
			navigate('/verificate-phrase-3')
		}
	}
	
	return (
		<section className={cn('bg-white')}>
			<GoBack />
			<Title mt>
				<Lang eng='Verify Mnemonic' cny='验证助记符' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<Title type='sm'>
						<Lang
							eng='Please verify your mnemonic phrase:'
							cny='请验证您的助记词：'
						/>{' '}
						(2/3)
					</Title>
					<PhraseBox nums btns={false} />
					<Title type='sm'>
						<Lang eng='Select word number ' cny='选择字数 ' />
						{countVerification[1]} :
					</Title>
					<PhraseBox
						wordActive={word2}
						btns={false}
						select={true}
						setWord={setWord2}
					/>
				</div>
				<div className='wallet_body__bottom'>
					<Button
						onClick={goToNextPage}
						className={cn({ ['disabled']: word2 === '' })}
						type='primary'
						id='confirm-info-btn'>
						<Lang eng='Next' cny='下一个' />
					</Button>
				</div>
			</div>
		</section>
	)
}