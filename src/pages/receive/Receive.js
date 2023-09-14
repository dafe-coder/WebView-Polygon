import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './receive.module.css';
import Title from '../../components/Title/Title';
import SelectToken from '../../components/SelectToken/SelectToken';
import Buttons from '../../components/Buttons/Buttons';
import Par from '../../components/Par/Par';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import copyText from '../../Func.wallet/copy';
import SvgPhrase from '../../components/PhraseBox/SvgPhrase';
import Lang from '../../components/Lang/Lang';
import { useLocation, useNavigate } from 'react-router-dom';
import { setChooseCoinOne } from '../../store/slices/transactionSlice';

export const Receive = ({ dataLoading, dataList }) => {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);
	const { walletAddress } = useSelector((state) => state.wallet);
	const { chooseCoinOne } = useSelector((state) => state.transaction);

	React.useEffect(() => {
		if (state !== null) {
			dispatch(setChooseCoinOne(state));
		}
	}, [state]);

	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons onClick={() => navigate(-1)} type='back'></Buttons>
						<Title>
							<Lang eng='Payment Information' cny='支付信息' />
						</Title>
						<div></div>
					</div>
					<SelectToken init chooseCoin={chooseCoinOne} />
				</div>
				<div className='wallet-bottom'>
					<div className={styles.qr_code}>
						<div id='qrcode'>
							{walletAddress != undefined ? (
								<QRCode
									bgColor='var(--dark-bg)'
									fgColor='white'
									size={110}
									value={walletAddress}
								/>
							) : (
								<></>
							)}
						</div>
					</div>
					<Par color='white' style={{ marginBottom: 40 }}>
						<Lang
							eng='Please scan the QR code to get information for payment'
							cny='请扫描二维码获取支付信息'
						/>
					</Par>
					<label className={styles.label}>
						<Lang eng='Your wallet address' cny='你的钱包地址' />
					</label>
					<button
						className={styles.btn}
						onClick={() => copyText(walletAddress, setCopied)}
					>
						{walletAddress.length > 0
							? walletAddress.slice(0, 15) + '...' + walletAddress.slice(-15)
							: ''}
						{copied == true ? (
							<>
								<SvgPhrase type='check' />
							</>
						) : (
							<>
								<SvgPhrase type='copy' />
							</>
						)}
					</button>
				</div>
			</div>
		</section>
	);
};
