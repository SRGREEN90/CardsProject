import React, {ChangeEvent} from 'react';
import email from '../../../assets/images/email.svg'
import s from './CheckEmail.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";


const CheckEmail = () => {

    const emailName = useSelector<AppRootStateType, string>(state => state.recovery.email);
    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend);


    return (
        <div className={s.wrap}>

            <img src={email} alt=""/>

            <h1>Check Email</h1>

            <h5>We've sent an Email with instructions to <span>{emailName}</span></h5>

        </div>
    );
};
export default CheckEmail
