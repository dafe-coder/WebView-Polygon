import React from 'react'
import styles from './phrase-box.module.css'
import cn from 'classnames'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SvgPhrase from './SvgPhrase'
import { useDispatch } from 'react-redux'
import copyText from '../../Func.wallet/copy'
import Lang from '../Lang/Lang'

const PhraseBox = ({
	btns = true,
	select = false,
	setOpenQr = Function.prototype,
	setWord,
	nums,
	wordActive,
}) => {
	const { phraseArr, phrase, phraseArrScattered } = useSelector(
		(state) => state.create
	)
	const [copied, setCopied] = useState(false)
	const dispatch = useDispatch()

	const numsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

	const chooseWord = (e, word) => {
		e.target
			.closest('ul')
			.querySelectorAll('li')
			.forEach((item) => {
				item.classList.remove('active')
			})
		e.target.classList.add('active')
		dispatch(setWord(word))
	}

	return (
		<div className={cn(styles.phrase)}>
			{select ? (
				<ul
					className={cn(styles.list, styles.choose_list, 'choose-word', {
						[styles.list_ver]: btns == false,
					})}>
					{phraseArrScattered.map((item, i) => {
						return (
							<li
								key={i}
								onClick={(e) => chooseWord(e, item)}
								className={cn({ ['active']: item == wordActive })}>
								{item}
							</li>
						)
					})}
				</ul>
			) : nums ? (
				<ul
					className={cn(styles.list, {
						[styles.list_ver]: btns == false,
					})}>
					{numsArr.map((item, i) => {
						return <li key={i}>{item}</li>
					})}
				</ul>
			) : (
				<ul
					className={cn(styles.list, {
						[styles.list_ver]: btns == false,
					})}>
					{phraseArr.map((item, i) => {
						return <li key={i}>{item}</li>
					})}
				</ul>
			)}
			{btns == true ? (
				<div className={styles.buttons}>
					<button
						onClick={() => copyText(phrase, setCopied)}
						id='copy-phrase'
						className={cn({
							[styles.success]: copied == true,
						})}>
						{copied == true ? (
							<>
								<SvgPhrase type='check' />
								<span style={{color: 'white'}}>
									<Lang eng='Copied' cny='已复制' />
								</span>
							</>
						) : (
							<>
								<SvgPhrase type='copy' />
								<span style={{color: 'white'}}>
									<Lang eng='Copy' cny='复制' />
								</span>
							</>
						)}
					</button>
					<button id='create-qr-btn' onClick={() => setOpenQr(true)}  style={{color: 'white'}}>
						<SvgPhrase type='qrCode' />
						<Lang eng='QR Code' cny='QR码' />
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
export default PhraseBox
