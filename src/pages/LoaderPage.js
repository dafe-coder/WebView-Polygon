import React from 'react';
import LoadingSvg from '../components/LoadingSvg/LoadingSvg';
import { setPlayAnimWallet } from '../store/slices/walletSlice';
import { useDispatch } from 'react-redux';

export const LoaderPage = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(setPlayAnimWallet(true));
	}, []);

	return <LoadingSvg />;
};
