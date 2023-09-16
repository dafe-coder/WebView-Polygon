import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dataUser: null,
	password: '',
	isLogin: false,
	autoLock: true,
	lockWallet: true,
	currentAccount: '',
	currentNetwork: 'Ethereum',
	chooseAssets: ['shib', 'bnb', 'eth', 'matic'],
	currencyWallet: 'usd',
	lang: 'eng',
	timer: null,
	chooseTimeOut: '30 minutes',
};

const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		resetWallet(state) {
			state.dataUser = null;
			state.password = '';
			state.isLogin = false;
			state.autoLock = true;
			state.currentNetwork = 'Ethereum';
			state.chooseAssets = ['shib', 'bnb', 'eth', 'matic'];
		},
		setInitChooseAssets(state) {
			state.chooseAssets = ['shib', 'bnb', 'eth', 'matic'];
		},
		setCurrencyWallet(state, action) {
			state.currencyWallet = action.payload;
		},
		setAddressCurrentAccount(state, action) {
			state.dataUser = state.dataUser.map((item) => {
				if (item.name === action.payload.name) {
					item.address = action.payload.address;
					return item;
				} else {
					return item;
				}
			});
		},
		setChooseTimeOut(state, action) {
			state.chooseTimeOut = action.payload;
		},
		setLang(state, action) {
			state.lang = action.payload;
		},
		setChooseAssets(state, action) {
			const newArr = state.chooseAssets.find(
				(item) => item == action.payload.toLowerCase()
			);
			state.chooseAssets =
				newArr === undefined
					? [...state.chooseAssets, action.payload.toLowerCase()]
					: state.chooseAssets.filter(
							(b) => b !== action.payload.toLowerCase()
					  );
		},
		setDeleteWallet(state, action) {
			const withoutAcc = state.dataUser.filter(
				(item) => item.name !== action.payload
			);
			state.currentAccount = withoutAcc[0].name;
			state.dataUser = withoutAcc;
		},
		setCurrentAccount(state, action) {
			state.currentAccount = action.payload;
		},
		setData(state, action) {
			if (state.dataUser !== null && state.dataUser.length) {
				state.dataUser = [...state.dataUser, action.payload];
			} else {
				state.dataUser = [action.payload];
			}
		},
		setIsLogin(state, action) {
			state.isLogin = action.payload;
		},
		setPassword(state, action) {
			state.password = action.payload;
		},
		setAutoLock(state, action) {
			state.autoLock = action.payload;
		},
		setLockWallet(state, action) {
			state.lockWallet = action.payload;
		},
		setCurrentNetwork(state, action) {
			state.currentNetwork = action.payload;
		},
		setTimer(state, action) {
			state.timer = action.payload;
		},
	},
});

export const {
	setData,
	resetWallet,
	setPassword,
	setIsLogin,
	setAutoLock,
	setLockWallet,
	setCurrentAccount,
	setDeleteWallet,
	setCurrentNetwork,
	setChooseAssets,
	setInitChooseAssets,
	setAddressCurrentAccount,
	setLang,
	setCurrencyWallet,
	setTimer,
	setChooseTimeOut,
} = storageSlice.actions;

export default storageSlice.reducer;
