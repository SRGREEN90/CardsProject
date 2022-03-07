import React, {ChangeEvent} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {passwordRecoveryTC} from "../../../main/bll/passwordRecoveryReducer";

const PasswordRecovery = () => {

    let onChangeText = (value: string) => {
        return value
    }

    let submitHandler = (newPassword: string) => {

    }
    // useEffect(() => {
    //     dispatch(initializeAppTC())
    // }, [])

    return (
        <div>
            <h1>Create new password</h1>
            <SuperInputText onChangeText={onChangeText} />
            <h3>Create new password and we will send you further instructions to email</h3>
            <div>
                <SuperButton>Create new password</SuperButton>

            </div>

        </div>
    );
};
export default PasswordRecovery
