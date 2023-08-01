import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	passwordCheck: '',
    passwordValid: null,
    passwordInit: '',
    passwordMatch: null,
    name: '',
    nameValid: null,
    restorePhrase: '',
    restorePhraseValid: null,
    phrase: '',
    phraseArr: [],
    phraseArrScattered: [],
    countVerification: [],
    word1: '',
    word2: '',
    word3: ''
}

const createWalletSlice = createSlice({
	name: 'create',
	initialState,
	reducers: {
		setPasswordCheck(state, action) {
			state.passwordCheck = action.payload
		},
        setCountVerification(state, action) {
            state.countVerification = action.payload
        },
        setPhrase(state, action) {
            state.phrase = action.payload
        },
        setPhraseArr(state, action) {
            state.phraseArr = action.payload
        },
        setPhraseArrScattered(state, action) {
            state.phraseArrScattered = action.payload
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
        },
        setWord1(state, action) {
            state.word1 = action.payload
        },
        setWord2(state, action) {
            state.word2 = action.payload
        },
        setWord3(state, action) {
            state.word3 = action.payload
        },
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
    setRestorePhraseValid,
    setPhrase,
    setPhraseArr,
    setPhraseArrScattered,
    setCountVerification,
    setWord1,
    setWord2,
    setWord3
} = createWalletSlice.actions

export default createWalletSlice.reducer
