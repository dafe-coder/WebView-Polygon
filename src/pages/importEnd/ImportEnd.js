import React from 'react';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import GoBack from '../../components/GoBack/GoBack';
import AccountCardReg from './../../components/AccountCardReg/AccountCardReg';
import Lang from '../../components/Lang/Lang';
import { useDispatch } from 'react-redux';
import { setDataWallet } from '../../store/slices/walletSlice';

export const ImportEnd = ({ setUpdateWallet, dataCoins }) => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(setDataWallet(null));
	}, []);

	return (
		<section className='bg-white'>
			<GoBack goTo='RestoreWalletReg' />
			<Title mt>
				<Lang eng='Restore Wallet' cny='恢复钱包' />
			</Title>
			<div className='wallet_body'>
				<div className='wallet_body__top'>
					<Title type='subtitle'>
						<Lang
							eng='Confirm the account to be restored:'
							cny='确认要恢复的账号：'
						/>
					</Title>
					<AccountCardReg
						dataCoins={dataCoins}
						setUpdateWallet={setUpdateWallet}
					/>
				</div>
				<div className='wallet-body__bottom'>
					<Button to='/wallet' type='white'>
						<Lang eng='Confirm' cny='确认' />
					</Button>
				</div>
			</div>
		</section>
	);
};
