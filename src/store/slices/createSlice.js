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
    word3: '',
    registered: false
}

const createWalletSlice = createSlice({
	name: 'create',
	initialState,
	reducers: {
        resetCreate(state) {
            state.passwordCheck = '',
            state.passwordValid = null,
            state.passwordInit = '',
            state.passwordMatch = null,
            state.name = '',
            state.nameValid = null,
            state.restorePhrase = '',
            state.restorePhraseValid = null,
            state.phrase = '',
            state.phraseArr = [],
            state.phraseArrScattered = [],
            state.countVerification = [],
            state.word1 = '',
            state.word2 = '',
            state.word3 = '',
            state.registered = false
        },
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
        setRegistered(state, action) {
            state.registered = action.payload
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
    setRestorePhraseValid,
    setPhrase,
    setPhraseArr,
    setPhraseArrScattered,
    setCountVerification,
    setWord1,
    setWord2,
    setWord3,
    resetCreate,
    setRegistered
} = createWalletSlice.actions

export default createWalletSlice.reducer
