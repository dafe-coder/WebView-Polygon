import React from 'react'
import checkLang from '../../Func.wallet/lang'
import { useSelector } from 'react-redux'

const Lang = ({ eng, cny }) => {
	const { lang } = useSelector((state) => state.wallet)
	return <>{checkLang(eng, cny, lang)}</>
}
export default Lang
