import React from 'react'
import styles from './assets-search.module.css'
import Lang from '../Lang/Lang'

const AssetsSearch = ({ setValue, value }) => {
	return (
		<div className={styles.wallet_input}>
			<input
				onChange={(e) => setValue(e.target.value)}
				type='text'
				id='searchAssets'
				className='input'
				value={value}
				required
			/>
			<label className='label' htmlFor='searchAssets'>
				<svg
					width='15'
					height='15'
					viewBox='0 0 15 15'
					fill='#737373'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M13.8633 14.0117L9.98047 10.1562C10.8555 9.14453 11.3477 7.85938 11.3477 6.4375C11.3477 3.32031 8.77734 0.75 5.66016 0.75C2.51562 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.66016 12.125C7.05469 12.125 8.33984 11.6328 9.35156 10.7578L13.207 14.6406C13.3164 14.7227 13.4258 14.75 13.5625 14.75C13.6719 14.75 13.7812 14.7227 13.8633 14.6406C14.0273 14.4766 14.0273 14.1758 13.8633 14.0117ZM5.6875 11.25C3.00781 11.25 0.875 9.08984 0.875 6.4375C0.875 3.78516 3.00781 1.625 5.6875 1.625C8.33984 1.625 10.5 3.78516 10.5 6.4375C10.5 9.11719 8.33984 11.25 5.6875 11.25Z' />
				</svg>
				<Lang eng='Search for asset' cny='搜索资产' />
			</label>
		</div>
	)
}

export default AssetsSearch
