import React from 'react';
import styles from './pincode.module.css'
import { PincodeInput } from './PincodeInput';
import Par from '../Par/Par';

export const Pincode = ({first = false, autoFocusOne = false, clear, setValue, styleWrap, label}) => {
    const formRef = React.useRef(null)
	const hasOnlyDigits = (v) => /^\d+$/.test(v)

    function handleEnter(e) {
        e.preventDefault();
        const form = formRef?.current
        const index = [...form].indexOf(e.target)

        if(e.target.value.length && hasOnlyDigits(e.target.value)) {
            form[index + 1]?.focus()
            setValue(state => state + e.target.value)
        } else {
            e.target.value = ''
        }
    }

    function handleEnterKeyboard(e) {
        if(e.key === 'Backspace') {
            const form = formRef?.current
            const index = [...form].indexOf(e.target)
            e.target.value = ''
            form[index - 1]?.focus()
            setValue((state) => state.split('').filter((_, i) => i !== index && i !== index - 1).join(''))
        }        
    }

    React.useEffect(() => {
        if(formRef?.current && first) {
            [...formRef?.current][0].focus()
        }
    }, [formRef])

    React.useEffect(() => {
        if(clear) {
            [...formRef?.current].forEach(item => item.value = '')
        }
    }, [clear])

    React.useEffect(() => {
        if(autoFocusOne && first) {
            [...formRef?.current][0].focus()
        }
    }, [autoFocusOne])

    return (
       <div style={styleWrap}>
            <Par mb={8} color='primary'>{label}</Par>
            <form ref={formRef} action='#' className={styles.list} >
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
                <PincodeInput onChange={handleEnter} onKeyDown={handleEnterKeyboard} />
            </form>
       </div>
    )
}