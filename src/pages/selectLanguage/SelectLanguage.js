import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import Title from '../../components/Title/Title'
import Buttons from '../../components/Buttons/Buttons'
import styles from './select-language.module.css'
import Svg from '../../svgs/Svg'
import { useDispatch, useSelector } from 'react-redux'
import Lang from '../../components/Lang/Lang'
import { setLang } from '../../store/slices/storageSlice'
import { setPortfolioSort } from '../../store/slices/walletSlice'

export const SelectLanguage = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
	const { langList } = useSelector((state) => state.wallet)
	const {lang} = useSelector(state => state.storage)
	const [filteredLang, setFilteredLang] = useState([])
	const [value, setValue] = useState('')

	useEffect(() => {
		setFilteredLang(langList)
	}, [langList])

	useEffect(() => {
		if (value != '') {
			let filteredArr = langList.filter(
				(item) => item.lang.toLowerCase().indexOf(value.toLowerCase()) != -1
			)
			setFilteredLang(filteredArr)
		} else {
			setFilteredLang(langList)
		}
	}, [value])

	const onChooseLang = (langItem) => {
        dispatch(setLang(langItem.short))
        dispatch(
            setPortfolioSort(
                (<Lang eng='value' cny='价值' />).props[langItem.short]
            )
        )
	}
	return (
		<section className='bg-white'>
			<div className='wallet-body'>
				<div className='wallet-top'>
					<div className='wallet-header'>
						<Buttons
							onClick={() => navigate(-1)}
							type='back'
						/>
						<Title>
							<Lang eng='Select Language' cny='选择语言' />
						</Title>
						<div></div>
					</div>
				</div>
				<div className='wallet-bottom'>
					<div className={styles.body}>
						<div className='wallet-input'>
							<input
								onChange={(e) => setValue(e.target.value)}
								type='search'
								className='input'
								id='search-language'
								required={true}
								value={value}
							/>
							<label htmlFor='search-language' className='label'>
								<Svg type='search' />
								<Lang eng='Search for language' cny='搜索语言' />
							</label>
						</div>
						<ul className={styles.list}>
							<li>
								<span>
									<Lang eng='Default' cny='默认' /> (English)
								</span>
							</li>
							{filteredLang.map((item, i) => (
								<LangItem
									key={i}
									lang={lang}
									item={item}
									onChooseLang={onChooseLang}
								/>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

const LangItem = ({ item, onChooseLang, lang }) => {
	return (
		<li
			onClick={() => onChooseLang(item)}
			className={cn({
				[styles.active]: lang == item.short,
			})}>
			<span>{item.lang}</span>
		</li>
	)
}
