import React from 'react'
import cn from 'classnames'
import Form from '../../components/Form/Form'

import Title from './../../components/Title/Title'
import GoBack from './../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
export const CreateData = () => {
	return (
		<section className={cn('bg-white')}>
			<Title mt>
				<Lang eng='Create Wallet' cny='创建钱包' />
			</Title>
			<GoBack goTo='Home' />
			<div className='wallet_body'>
				<Form />
			</div>
		</section>
	)
}