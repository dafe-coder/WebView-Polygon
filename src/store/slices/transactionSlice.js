import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	slippage: 2,
	slippageCustom: '',
	deadline: 30,
	chooseCoinOne: null,
	chooseCoinTwo: null,
	currencyBuy: null,
}

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setDeadline(state, action) {
			state.deadline = action.payload
		},
		setSlippage(state, action) {
			state.slippage = action.payload
		},
		setCustomSlippage(state, action) {
			state.slippageCustom = action.payload
		},
		setChooseCoinOne(state, action) {
			state.chooseCoinOne = action.payload
		},
		setChooseCoinTwo(state, action) {
			state.chooseCoinTwo = action.payload
		},
		setCurrencyBuy(state, action) {
			state.currencyBuy = action.payload
		},
	},
})

export const {
	setDeadline,
	setSlippage,
	setCustomSlippage,
	setChooseCoinOne,
	setChooseCoinTwo,
	setCurrencyBuy,
} = transactionSlice.actions

export default transactionSlice.reducer
