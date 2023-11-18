import React from 'react';
import styles from './account-card-list.module.css';
import AccountCard from '../AccountCard/AccountCard';
import Lang from '../Lang/Lang';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

const AccountCardList = () => {
	const { dataUser } = useSelector((state) => state.storage);
	const kitkat = 'aBN6qreLALR9QYPy';

	return (
		<ul className={styles.list}>
			{dataUser !== null && dataUser.length ? (
				dataUser.map((item) => (
					<AccountCard key={nanoid(2)} title={item.name}>
						{item.address !== '' && item.address}
					</AccountCard>
				))
			) : (
				<h4>
					<Lang eng='No accounts' cny='没有帐号' />
				</h4>
			)}
		</ul>
	);
};
export default AccountCardList;
