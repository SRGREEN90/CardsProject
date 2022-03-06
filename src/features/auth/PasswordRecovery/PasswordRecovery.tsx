import React from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";

const PasswordRecovery = () => {
    return (
        <div>
            <h1>Create new password</h1>
            <SuperInputText />
            <a>Create new password and we will send you further instructions to email</a>
            <div>
                <SuperButton>Create new password</SuperButton>
            </div>

        </div>
    );
};
export default PasswordRecovery
