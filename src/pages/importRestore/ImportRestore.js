import React from 'react'
import Title from '../../components/Title/Title'
import GoBack from '../../components/GoBack/GoBack'
import Lang from '../../components/Lang/Lang'
import Button from '../../components/Button/Button';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import Par from '../../components/Par/Par';
import { useLocation } from 'react-router-dom';

export const ImportRestore = () => {
	const {state} = useLocation()
	const [chooseOne, setChooseOne] = React.useState(false)
	const [chooseTwo, setChooseTwo] = React.useState(false)
	const [chooseThree, setChooseThree] = React.useState(false)

	return (
		<section className={'bg-white'}>
			<GoBack to={state !== null && state.from == 'welcomeBack' ? '/' : ''} />
			<Title mt>
				<Lang eng='Before We Begin' cny='在我们开始之前' />
			</Title>
			<div className='wallet_body'>
				<div>
					<Par mb={20}> 
						<Lang eng='Please enter your Secret Recovery Phrase when prompted.' cny='请在出现提示时输入您的秘密恢复短语。' />
					</Par>
					<CheckBox active={chooseOne} setActive={setChooseOne} label={<Lang eng='I understand this is a self-custody wallet and I am responsible for my funds and assets. Polygon can NOT access my wallet or reverse transactions on my behalf.' cny='我了解这是一个自我托管钱包，我对我的资金和资产负责。 Polygon 无法代表我访问我的钱包或反向交易。' />} containerStyle={{marginBottom: 20}}/>
					<CheckBox active={chooseTwo} setActive={setChooseTwo} label={<Lang eng='I have read and agree to the Terms & Conditions specified here.' cny='我已阅读并同意此处指定的条款和条件。' />} containerStyle={{marginBottom: 20}} />
					<CheckBox active={chooseThree} setActive={setChooseThree} label={<Lang eng='I want to help Polygon by choosing to share my analytics.' cny='我想通过选择分享我的分析来帮助 Polygon。' />}/>
				</div>
				<Button type='primary' to='/import-data' className={!chooseOne || !chooseTwo || !chooseThree ? 'disabled' : ''}>Recover My wallet</Button>
			</div>
		</section>
	)
}