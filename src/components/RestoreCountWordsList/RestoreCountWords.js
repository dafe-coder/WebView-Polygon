import React from 'react'
import RestoreCountWordsItem from '../RestoreCountWordsItem/RestoreCountWordsItem'
import styles from './restore-count-words.module.css'
import Lang from '../Lang/Lang'
const RestoreCountWords = () => {
	return (
		<ul className={styles.list}>
			<RestoreCountWordsItem
				title={
					<Lang
						eng='Enter a 12-word recovery phrase'
						cny='输入一个 12 字的辅助短语'
					/>
				}
				walletKey='12'>
				<Lang
					eng='If you have a recovery phrase consisting of 12 words, choose this option'
					cny='如果您有一个由 12 个单词组成的恢复短语，请选择此选项'
				/>
			</RestoreCountWordsItem>
			<RestoreCountWordsItem
				title={
					<Lang
						eng='Enter a 15-word recovery phrase'
						cny='输入一个 15 字的恢复短语'
					/>
				}
				walletKey='15'>
				<Lang
					eng='If you have a recovery phrase consisting of 12 words, choose this option
				to restore your wallet. If you have a recovery phrase consisting of 12
				words, choose this option to restore your wallet. If you have a recovery
				phrase consisting of 12 words, choose this option to restore your
				wallet.'
					cny='如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。'
				/>
			</RestoreCountWordsItem>
			<RestoreCountWordsItem
				title={
					<Lang
						eng='Enter a 24-word recovery phrase'
						cny='输入一个 24 字的恢复短语'
					/>
				}
				walletKey='24'>
				<Lang
					eng='If you have a recovery phrase consisting of 12 words, choose this option
				to restore your wallet. If you have a recovery phrase consisting of 12
				words, choose this option to restore your wallet. If you have a recovery
				phrase consisting of 12 words, choose this option to restore your
				wallet.'
					cny='如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。'
				/>
			</RestoreCountWordsItem>
			<RestoreCountWordsItem
				title={<Lang eng='Enter a private key' cny='输入私钥' />}
				walletKey='own'>
				<Lang
					eng='If you have a recovery phrase consisting of 12 words, choose this option to restore your wallet. If you have a recovery phrase consisting of 12 words, choose this option to restore your wallet. If you have a recovery phrase consisting of 12 words, choose this option to restore your wallet.'
					cny='如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。 如果您有一个由 12 个单词组成的恢复短语，请选择此选项来恢复您的钱包。'
				/>
			</RestoreCountWordsItem>
		</ul>
	)
}

export default RestoreCountWords
