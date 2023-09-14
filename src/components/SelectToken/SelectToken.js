import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './select-token.module.css';
import Svg from '../../svgs/Svg';
import { useDispatch } from 'react-redux';
import {
	setChooseCoinOne,
	setChooseCoinTwo,
} from '../../store/slices/transactionSlice';
import Lang from '../Lang/Lang';
import { useSelector } from 'react-redux';
import fixNum from '../../Func.wallet/fixNum';

const SelectToken = ({ noSubtitle, chooseCoin = 'one', init = true }) => {
	const { allCoins } = useSelector((state) => state.wallet);
	const { lang } = useSelector((state) => state.storage);
	const { chooseCoinOne, chooseCoinTwo } = useSelector(
		(state) => state.transaction
	);
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const [active, setActive] = useState(
		chooseCoinOne !== null && init
			? chooseCoinOne.symbol
			: (<Lang eng='Select a token' cny='选择一个令牌' />).props[lang]
	);
	const [activeElem, setActiveElem] = useState(
		chooseCoinOne !== null && init ? chooseCoinOne : {}
	);
	const [openDropdown, setOpenDropdown] = useState(false);
	const [dataAllFiltered, setDataAllFiltered] = useState([]);

	React.useEffect(() => {
		if (chooseCoinOne !== null && init && chooseCoin === 'one') {
			setActive(chooseCoinOne.symbol);
			setActiveElem(chooseCoinOne);
		} else if (chooseCoinTwo !== null && chooseCoin === 'two') {
			setActive(chooseCoinTwo.symbol);
			setActiveElem(chooseCoinTwo);
		}
	}, [chooseCoinOne]);

	React.useEffect(() => {
		if (allCoins !== null) {
			setDataAllFiltered(allCoins);
		}
	}, [allCoins]);

	useEffect(() => {
		if (allCoins !== null && value !== '') {
			setDataAllFiltered(
				allCoins.filter(
					(item) =>
						item.symbol.toLowerCase().includes(value.toLowerCase()) ||
						item.name.toLowerCase().includes(value.toLowerCase())
				)
			);
		} else {
			setDataAllFiltered(allCoins);
		}
	}, [value, allCoins]);

	const onChooseToken = (item) => {
		setActiveElem(item);
		setActive(item.symbol);
		setOpenDropdown(false);
		if (chooseCoin === 'one') {
			dispatch(setChooseCoinOne(item));
		} else {
			dispatch(setChooseCoinTwo(item));
		}
	};

	return (
		<div className={styles.body}>
			<label
				className={styles.label_relative}
				style={noSubtitle ? { display: 'none' } : { display: 'block' }}
			>
				<Lang eng='Asset Name' cny='资产名称' />
			</label>
			<div className={styles.dropdown}>
				<button
					className={styles.select}
					onClick={() => setOpenDropdown(!openDropdown)}
				>
					{active ==
					(<Lang eng='Select a token' cny='选择一个令牌' />).props[lang] ? (
						active
					) : (
						<div className={styles.item}>
							<div className={styles.logo}>
								<img
									src={activeElem.image ? activeElem.image.thumb : ''}
									alt=''
								/>
							</div>
							<h4 className={styles.title}>{activeElem.symbol}</h4>
						</div>
					)}
					<Svg
						type='arr-sm-down'
						className={cn(styles.svg, {
							[styles.active_svg]: openDropdown == true,
						})}
					/>
				</button>
				<ul
					className={cn(styles.list, {
						[styles.open]: openDropdown == true,
					})}
				>
					<li className={styles.search}>
						<input
							type='text'
							id='search-assets-transaction'
							className={styles.input}
							required={true}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						<label htmlFor='search-assets-transaction' className={styles.label}>
							<Svg type='search' />
							<Lang eng='Search for asset' cny='搜索资产' />
						</label>
					</li>
					{dataAllFiltered.length >= 1 ? (
						dataAllFiltered.map((item) => {
							return (
								<li
									key={item.id}
									className={cn({
										[styles.active]: active == item.symbol,
									})}
									onClick={() => onChooseToken(item)}
								>
									<div className={styles.logo}>
										<img src={item.image.thumb} alt='' />
									</div>
									<div className={styles.info}>
										<h5 className={styles.title}>{item.symbol}</h5>
										<p className={styles.par}>{item.name}</p>
									</div>
									<span>{fixNum(item.market_data.balance)}</span>
								</li>
							);
						})
					) : (
						<h4>
							<Lang eng='Nothing' cny='没有什么' />
						</h4>
					)}
				</ul>
			</div>
		</div>
	);
};
export default SelectToken;
