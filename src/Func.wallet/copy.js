export default function copyText(text, setCopied) {
	if (text !== '') {
		setCopied(true)

		var copyHelper = document.createElement('input')
		copyHelper.className = 'copyhelper'
		document.body.appendChild(copyHelper)
		copyHelper.value = text
		copyHelper.select()
		document.execCommand('copy')
		setTimeout(() => {
			setCopied(false)
			document.body.removeChild(copyHelper)
		}, 1000)
	}
}
