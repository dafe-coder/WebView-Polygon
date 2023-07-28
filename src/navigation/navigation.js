import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Start, ImportRestore, ImportData, ImportEnd, Wallet, CreateData, CreateSubmit, PortfolioOpen, Send, Settings, About, SecurityPrivacy } from '../pages/'

import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLockWallet } from '../store/slices/storageSlice'

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
				element: <SecurityPrivacy />,
			},
		])
	}, [isLogin])

	if (routes == null) {
		return
	}

	const router = createBrowserRouter(routes)
	return <RouterProvider router={router}/>
}
