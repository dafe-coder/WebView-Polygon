import React from 'react'
import InputPass from './InputPass'
import InputName from './InputName'
import InputPassCheck from './InputPassCheck'
import InputPassLog from './InputPassLog'

const Input = ({ id, label, errorPar, type = 'normal', noAnim }) => {
	switch (type) {
		case 'normal':
			return <InputName id={id} label={label} errorPar={errorPar} />
		case 'password':
			return <InputPass id={id} label={label} />
		case 'password-check':
			return <InputPassCheck id={id} label={label} errorPar={errorPar} />
		case 'pass-log':
			return (
				<InputPassLog
					noAnim={noAnim}
					id={id}
					label={label}
					errorPar={errorPar}
				/>
			)
		default:
			return <></>
	}
}

export default Input
