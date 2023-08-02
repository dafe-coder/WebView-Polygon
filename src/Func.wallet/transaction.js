import Web3 from 'web3' // npm install web3
import { Transaction } from '@ethereumjs/tx' // npm install ethereumjs-tx

/**
 * CONFIG
 * @param YOUR_INFRA_PROJECT_ID - goto https://infura.io/register, create an account and get the endpoint;
 * @param MIN_ABI - application binary interface, sould look like this don't change;
 */

const web3 = new Web3('https://rpc.ankr.com/eth')

const MIN_ABI = [
	{
		constant: false,
		inputs: [
			{
				name: '_to',
				type: 'address',
			},
			{
				name: '_value',
				type: 'uint256',
			},
		],
		name: 'transfer',
		outputs: [
			{
				name: 'success',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
]

/*Returns current gas price. 
The gas limit is determined by the latest block median gas limit.*/
async function getGasLimit() {
	try {
		const latestBlock = await web3.eth.getBlock('latest')
		return (latestBlock.gasUsed / latestBlock.transactions.length) | 0 //return whole number
	} catch (error) {
		throw new Error(`Unable to get GasLimit!`)
	}
}

/*Returns current gas price. 
The gas price is determined by the last few blocks median gas price.*/
async function getGasPrice() {
	try {
		return await web3.eth.getGasPrice()
	} catch (error) {
		throw new Error(`Unable to get GasPrice!`)
	}
}

async function signAndSendTx(
	from,
	to,
	data,
	value,
	setHash,
	setOpenModal,
	setOpenModalGas,
	privateKey
) {
	try {
		var nonce = web3.utils.toHex(await web3.eth.getTransactionCount(from))
		var gasPrice = web3.utils.toHex(await getGasPrice())
		var gasLimit = web3.utils.toHex(await getGasLimit())
		console.log(gasPrice)
		var rawTransaction = {
			nonce: nonce,
			to: to,
			from: from,
			gasPrice: gasPrice,
			gasLimit: gasLimit,
			data: data,
			value: value,
		}
		var transaction = new Transaction(rawTransaction)
		console.log(transaction)

		//singing our tx with private key
		transaction.sign(Buffer.from(privateKey, 'hex'))

		console.log('Sending transaction...')
		web3.eth.sendSignedTransaction(
			'0x' + transaction.serialize().toString('hex'),
			(err, res) => {
				if (err) {
					setOpenModalGas(true)
					console.log(err)
				} else {
					setOpenModal(true)
					setHash(res)
				}
			}
		)
		/*
        Here you can get an error :"Transaction was not mined within 50 blocks.."
        It's ok, the transaction is pending for some time and will be mined soon.
        Just make sure to hadle this issue.
        */
		return 'Done!'
	} catch (error) {
		throw new Error(error.message)
	}
}

async function transferErc20Token(
	fromAddress,
	toAddress,
	tokenAddress,
	amount,
	setHash,
	setOpenModal,
	setOpenModalGas,
	privateKey
) {
	//format input
	fromAddress = web3.utils.toChecksumAddress(fromAddress)
	toAddress = web3.utils.toChecksumAddress(toAddress)
	tokenAddress = web3.utils.toChecksumAddress(tokenAddress)
	var token_amount = web3.utils.toHex(web3.utils.toWei(amount))

	var contract = await new web3.eth.Contract(MIN_ABI, tokenAddress, {
		from: fromAddress,
	})
	var data = contract.methods.transfer(toAddress, token_amount).encodeABI()
	return await signAndSendTx(
		fromAddress,
		tokenAddress,
		data,
		null,
		setHash,
		setOpenModal,
		setOpenModalGas,
		privateKey
	)
}

async function sendETH(
	fromAddress,
	toAddress,
	amount,
	setHash,
	setOpenModal,
	setOpenModalGas,
	privateKey
) {
	//format input
	fromAddress = web3.utils.toChecksumAddress(fromAddress)
	toAddress = web3.utils.toChecksumAddress(toAddress)
	var eth_amount = web3.utils.toHex(web3.utils.toWei(amount))

	return await signAndSendTx(
		fromAddress,
		toAddress,
		null,
		eth_amount,
		setHash,
		setOpenModal,
		setOpenModalGas,
		privateKey
	)
}

/*  __    __  ______  __  __   __       ______ __  __  __   __  ______    
#  /\ "-./  \/\  __ \/\ \/\ "-.\ \     /\  ___/\ \/\ \/\ "-.\ \/\  ___\   
#  \ \ \-./\ \ \  __ \ \ \ \ \-.  \    \ \  __\ \ \_\ \ \ \-.  \ \ \____  
#   \ \_\ \ \_\ \_\ \_\ \_\ \_\\"\_\    \ \_\  \ \_____\ \_\\"\_\ \_____\ 
#    \/_/  \/_/\/_/\/_/\/_/\/_/ \/_/     \/_/   \/_____/\/_/ \/_/\/_____/                                                                         
*/
export default async function transactionsSend(
	from,
	to,
	token,
	amount,
	ether = false,
	setHash,
	setOpenModal,
	setOpenModalGas,
	privateKey
) {
	// Set input data
	const FROM = from // address to send from
	const TO = to // address to send to
	const TOKEN = token // token address
	const AMOUNT = amount != 0 ? amount : '0' // amount of token/eth, has to be a String value: "322", "2.88" etc.
	if (ether) {
		sendETH(
			FROM,
			TO,
			AMOUNT,
			setHash,
			setOpenModal,
			setOpenModalGas,
			privateKey
		) // or sendETH(FROM, TO, "0.0025")
			.then((message) => {
				console.log(message)
			})
			.catch((error) => {
				console.log(error.message)
			})
	} else {
		transferErc20Token(
			FROM,
			TO,
			TOKEN,
			AMOUNT,
			setHash,
			setOpenModal,
			setOpenModalGas,
			privateKey
		) // or sendETH(FROM, TO, "0.0025")
			.then((message) => {
				console.log(message)
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}