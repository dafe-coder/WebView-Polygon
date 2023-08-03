import React from 'react';
import cn from 'classnames'
import styles from './pincode.module.css'

export const PincodeInput = ({onChange, onKeyDown, value, index}) => {
    return (
        <input index={index} onChange={(e) => onChange(e)} className={cn(styles.input)} onKeyDown={(e) => onKeyDown(e)} type='password' maxLength={1}/>
    )
}