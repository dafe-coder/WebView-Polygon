export default function fixNum(num) {
	let numArr = Number(Math.abs(num)).toFixedNoRounding(18).toString().split('.')
	let length = 0
	numArr[1].split('').some(function (el) {
		length++
		return el !== '0'
	})
	if (length > 15) {
		return Number(num).toFixedNoRounding(2)
	}
	if (numArr[0].length == 1 && numArr[0] != 1 && --length > 0 && num > 0) {
		return Number(num).toFixedNoRounding(length + 2)
	} else if (numArr[0].length == 1 && length >= 2) {
		return Number(num).toFixed(4)
	} else if (numArr[0].length == 2 && length < 3) {
		return Number(num).toFixedNoRounding(2)
	} else {
		return Number(num).toFixedNoRounding(2)
	}
}

Number.prototype.toFixedNoRounding = function (n) {
	const reg = new RegExp(`^-?\\d+(?:\\.\\d{0,${n}})?`, 'g')
	const a = this.toString().match(reg)[0]
	const dot = a.indexOf('.')

	if (dot === -1) {
		return a + '.' + '0'.repeat(n)
	}

	const b = n - (a.length - dot) + 1

	return b > 0 ? a + '0'.repeat(b) : a
}
