import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Start, ImportRestore, Accounts, ImportData, TransactionsHistory, ImportEnd, Wallet, CreateData,SelectCurrency, SelectLanguage, CreateSubmit, PortfolioOpen, Send, Settings, About, SecurityPrivacy, PrivateKey, SeedPhrase, ManageAccount, Buy, Receive, ManageAssets, Swap, TransactionSettings, CreateNotebook, CreatePhrase, VerificatePhrase2, VerificatePhrase3 } from '../pages/'

import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLockWallet } from '../store/slices/storageSlice'
import VerificatePhrase1 from '../pages/createVerification/VerificatePhrase1'

export default function () {
	const dispatch = useDispatch()
	const { isLogin, lockWallet, password, autoLock } = useSelector(
		(state) => state.storage
	)
	React.useEffect(() => {
		if (password !== '' && autoLock) {
			dispatch(setLockWallet(true))
		}
	}, [password, autoLock])
	const [routes, setRoutes] = React.useState(null)

	React.useEffect(() => {
		setRoutes([
			// {
			// 	path: '/',
			// 	element:
			// 		password !== '' && lockWallet && isLogin ? (
			// 			<Lock />
			// 		) : isLogin ? (
			// 			<Main />
			// 		) : (
			// 			<Start />
			// 		),
			// },
			{
				path: '/',
				element: <Start />,
			},
			{
				path: '/import',
				element: <ImportRestore />,
			},
			{
				path: '/import-data',
				element: <ImportData />,
			},
			{
				path: '/import-end',
				element: <ImportEnd />,
			},
			{
				path: '/wallet',
				element: <Wallet />,
			},
			{
				path: '/create-data',
				element: <CreateData />,
			},
			{
				path: '/create-submit',
				element: <CreateSubmit />,
			},
			{
				path: '/portfolio-open',
				element: <PortfolioOpen />,
			},
			{
				path: '/send',
				element: <Send />,
			},
			{
				path: '/settings',
				element: <Settings />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/security-privacy',
				element: <SecurityPrivacy />,
			},
			{
				path: '/private-key',
				element: <PrivateKey />,
			},
			{
				path: '/seed-phrase',
				element: <SeedPhrase />,
			},
			{
				path: '/select-language',
				element: <SelectLanguage />,
			},
			{
				path: '/select-currency',
				element: <SelectCurrency />,
			},
			{
				path: '/accounts',
				element: <Accounts />,
			},
			{
				path: '/manage-account',
				element: <ManageAccount />,
			},
			{
				path: '/transaction-history',
				element: <TransactionsHistory />,
			},
			{
				path: '/buy',
				element: <Buy />,
			},
			{
				path: '/receive',
				element: <Receive />,
			},
			{
				path: '/manage-assets',
				element: <ManageAssets />,
			},
			{
				path: '/swap',
				element: <Swap />,
			},
			{
				path: '/transaction-settings',
				element: <TransactionSettings />,
			},
			{
				path: '/create-notebook',
				element: <CreateNotebook />,
			},
			{
				path: '/create-phrase',
				element: <CreatePhrase />,
			},
			{
				path: '/verificate-phrase-1',
				element: <VerificatePhrase1 />,
			},
			{
				path: '/verificate-phrase-2',
				element: <VerificatePhrase2 />,
			},
			{
				path: '/verificate-phrase-3',
				element: <VerificatePhrase3 />,
			},
		])
	}, [isLogin])

	if (routes == null) {
		return
	}

	const router = createBrowserRouter(routes)
	return <RouterProvider router={router}/>
}
