import React, {ChangeEvent, useEffect, useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {passwordForgotTC} from "../../../main/bll/passwordReducer";
import {useDispatch} from "react-redux";


const ForgotYourPassword = () => {

const [email, setEmail] = useState('')

    const dispatch = useDispatch()


    let onClickHandler = () => {
        passwordForgotTC(email)
        console.log(email)
    }

    // useEffect(() => {
    //     // const thunk = passwordForgotTC()
    //     // dispatch(thunk)
    // }, [])


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
