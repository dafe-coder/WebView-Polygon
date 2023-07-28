import { ethers } from 'ethers'

export default function generateWallet(mnemonic) {
	let privateKey = ethers.Wallet.fromPhrase(mnemonic).privateKey.slice(2)
	return btoa(privateKey)
}