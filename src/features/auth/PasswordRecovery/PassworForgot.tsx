import React, {ChangeEvent} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";


const ForgotYourPassword = () => {

    // let onChangeText = (value: string) => {
    //     return value
    // }
    //
    // let submitHandler = (newPassword: string) => {
    //
    // }
    // useEffect(() => {
    //     dispatch(initializeAppTC())
    // }, [])

    return (
        <div>
            <h1>Forgot your password?</h1>
            <SuperInputText />
            <h5>Enter your email address and we will send you further instructions</h5>
            <div>
                <SuperButton>Send instructions</SuperButton>
            </div>
            <h5>Did you remember your password?</h5>
            <a>Try logging in</a>

        </div>
    );
};
export default ForgotYourPassword
