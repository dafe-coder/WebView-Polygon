import React from 'react';
// import cn from 'classnames'
// import styles from ''
import Checkbox from "react-custom-checkbox";
import Svg from '../../svgs/Svg';

export const CheckBox = ({style, label, containerStyle, active, setActive}) => {
    return (
        <Checkbox 
            containerStyle={{alignItems: 'flex-start', ...containerStyle}}
            style={{marginRight: 15, marginTop: 3, cursor: 'pointer'}}
            borderColor="#06040D"
            borderRadius={2}
            borderWidth={1}
            label={label}
            value={active}
            onChange={(value) => setActive(value)}
            labelStyle={{fontSize: 12, lineHeight: '18px', cursor: 'pointer', color: '#06040D', fontWeight: 400}}
            size={18} icon={<Svg style={{width: 8, height: 6}} type='check-bold' fill='#06040D'/>}/>
    )
}