import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import transactionSlice from './slices/transactionSlice'
import walletSlice from './slices/walletSlice'
import storageSlice from './slices/storageSlice'
import createSlice from './slices/createSlice'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
	wallet: walletSlice,
	storage: storageSlice,
	transaction: transactionSlice,
	create: createSlice
})

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['wallet', 'transaction', 'create'],
	timeout: null,
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
