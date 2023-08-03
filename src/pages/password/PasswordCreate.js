import React from 'react';
import GoBack from '../../components/GoBack/GoBack';
import Lang from '../../components/Lang/Lang';
import Title from '../../components/Title/Title';
import { Pincode } from '../../components/Pincode/Pincode';
import { useDispatch } from 'react-redux';
import { setPassword } from '../../store/slices/storageSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetCreate } from '../../store/slices/createSlice';

export const PasswordCreate = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [passwordOne, setPasswordOne] = React.useState('')
    const [passwordTwo, setPasswordTwo] = React.useState('')
    const [clear, setClear] = React.useState(false)
    const [autoFocusOne, setAutoFocusOne] = React.useState(false)

    React.useEffect(() => {
        setAutoFocusOne(false)
        setClear(false)
        if(passwordOne.length == 6 && passwordTwo.length == 6 && passwordTwo == passwordOne) {
            navigate(state.to)
            dispatch(setPassword(passwordOne))
            dispatch(resetCreate())
        } else if(passwordOne.length == 6 && passwordTwo.length == 6) {
            setPasswordOne('')
            setPasswordTwo('')
            setAutoFocusOne(true)
            setClear(true)
        }
    }, [passwordOne, passwordTwo])
    
    return (<section className='bg-white'>
        <GoBack goTo='WalletRestore' />
        <Title mt>
            <Lang eng='Create PIN' cny='创建 PIN 码' />
        </Title>
        <div className='wallet_body'>
            <div>
                <Pincode first autoFocusOne={autoFocusOne} clear={clear} label='Create PIN' styleWrap={{marginBottom: 15}} setValue={setPasswordOne}/>
                <Pincode clear={clear} label='Repeat PIN' setValue={setPasswordTwo}/>
            </div>
        </div>
    </section>)
}