import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {passwordForgotTC} from "../../../main/bll/passwordReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../../main/bll/store";


const ForgotYourPassword = () => {

    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend);

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    let onClickHandler = () => {
        dispatch(passwordForgotTC(email))
    }

    if (isSend) {
        return <Navigate to={'/check-email'}/>

    }
    console.log(isSend)

    return (
        <div>
            <h1>Forgot your password?</h1>

            <SuperInputText value={email} onChangeText={setEmail}/>

            <h5>Enter your email address and we will send you further instructions</h5>

            <div>
                <SuperButton onClick={onClickHandler}>Send instructions</SuperButton>
            </div>

            <h5>Did you remember your password?</h5>
            <a>Try logging in</a>

        </div>
    );
};
export default ForgotYourPassword
