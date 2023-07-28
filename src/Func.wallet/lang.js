export default function checkLang(eng, cny, lang) {
	let str = ''
	switch (lang) {
		case 'cny':
			str = cny
			break
		case 'eng':
			str = eng
			break
	}
	return str
}
