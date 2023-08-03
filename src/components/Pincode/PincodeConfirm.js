import React from 'react';
import { Pincode } from './Pincode';
import { useSelector } from 'react-redux';

export const PincodeConfirm = ({setValid}) => {
    const {password} = useSelector(state => state.storage)
    const [autoFocusOne, setAutoFocusOne] = React.useState(false)
    const [passwordOne, setPasswordOne] = React.useState('')
    const [clear, setClear] = React.useState('')
    
    React.useEffect(() => {
        setAutoFocusOne(false)
        setClear(false)
        if(password === passwordOne) {
            setValid(true)
            setPasswordOne('')
        } else if(passwordOne.length === 6) {
            setValid(false)
            setClear(true)
            setPasswordOne('')
            setAutoFocusOne(true)
        }
    }, [password, passwordOne])

    return (
        <Pincode first autoFocusOne={autoFocusOne} clear={clear}  styleWrap={{marginBottom: 15}} setValue={setPasswordOne}/>
    )
}