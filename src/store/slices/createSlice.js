import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	passwordCheck: '',
    passwordValid: null,
    passwordInit: '',
    passwordMatch: null,
    name: '',
    nameValid: null,
    restorePhrase: '',
    restorePhraseValid: null
}

const createWalletSlice = createSlice({
	name: 'create',
	initialState,
	reducers: {
		setPasswordCheck(state, action) {
			state.passwordCheck = action.payload
		},
        setPasswordInit(state, action) {
            state.passwordInit = action.payload
        },
        setPasswordMatch(state, action) {
            state.passwordMatch = action.payload
        },
        setPasswordValid(state, action) {
            state.passwordValid = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setNameValid(state, action) {
            state.nameValid = action.payload
        },
        setRestorePhrase(state, action) {
            state.restorePhrase = action.payload
        },
        setRestorePhraseValid(state, action) {
            state.restorePhraseValid = action.payload
        }
	},
})

export const {
	setPasswordCheck,
    setPasswordMatch,
    setPasswordInit,
    setPasswordValid,
    setName,
    setNameValid,
    setRestorePhrase,
    setRestorePhraseValid
} = createWalletSlice.actions

export default createWalletSlice.reducer
