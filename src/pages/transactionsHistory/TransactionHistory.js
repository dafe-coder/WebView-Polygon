import React, { useEffect, useState } from 'react';
import Buttons from '../../components/Buttons/Buttons';
import Title from '../../components/Title/Title';
import Svg from '../../svgs/Svg';
import TransactionList from './../../components/TransactionList/TransactionList';
import { useDispatch, useSelector } from 'react-redux';
import Lang from '../../components/Lang/Lang';
import LoaderList from '../../components/Loader/LoaderList';
import { setTransactionsHistoryClear } from '../../store/slices/walletSlice';
import { useNavigate } from 'react-router-dom';
import activeImg from '../../static/assets/images/active.png';

export const TransactionsHistory = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { transactionsHistoryClear, dataWallet } = useSelector(
		(state) => state.wallet
	);
	const [transactionList, setTransactionList] = useState([]);
	const [transactionsData, setTransactionsData] = useState([]);

	React.useEffect(() => {
		if (dataWallet !== null) {
			setTransactionsData(dataWallet.transactions);
		}
	}, [dataWallet]);

	useEffect(() => {
		if (transactionsData.length) {
			let filtered = transactionsData.filter(
				(item) => item.status !== 'failed'
			);
			if (transactionsHistoryClear.length >= 1) {
				let cleared = filtered.filter(
					(item) => transactionsHistoryClear.indexOf(item.id) == -1
				);
				setTransactionList(cleared);
			} else {
				setTransactionList(filtered);
			}
		}
	}, [transactionsData]);

	const onClear = () => {
		if (transactionList.length) {
			let clearList = transactionList.map((item) => item.id);
			dispatch(
				setTransactionsHistoryClear([...transactionsHistoryClear, ...clearList])
			);
			setTransactionList([]);
		}
	};
	return (
		<section className='bg-white'>
			<div
				className='wallet-body'
				style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
			>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons onClick={() => navigate(-1)} type='back'></Buttons>
						<Title>
							<Lang eng='Transactions History' cny='交易记录' />
						</Title>
						<Buttons type='settings'></Buttons>
					</div>
				</div>
				<div
					className={
						transactionList.length
							? 'wallet-center'
							: 'wallet-center wallet-center-df'
					}
				>
					{dataWallet !== null ? (
						transactionList.length ? (
							<TransactionList
								style={{ marginTop: '0' }}
								data={transactionList}
							/>
						) : (
							<div className='nothing'>
								<img width='100%' src={activeImg} alt='' />
								<Title mb mt='30'>
									<Lang eng='Don’t have history' cny='没有历史' />
								</Title>
							</div>
						)
					) : (
						<LoaderList />
					)}
				</div>
				<div className='wallet-bottom'>
					<a
						onClick={onClear}
						className={
							transactionList.length
								? 'link primary-link'
								: 'link transparent-link'
						}
						href='#'
					>
						<Lang eng='Clear All' cny='全部清除' /> <Svg type='trash' />
					</a>
				</div>
			</div>
		</section>
	);
};
