import React, {useState} from "react";
import {Frame} from "../../../../main/ui/common/Frame/Frame";
import SuperInputPassword from "../../../../main/ui/common/SuperInputPassword/SuperInputPassword";
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {changePassTC} from "../../../../main/bll/newPasswordReducer";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../main/bll/store";
import {PATH} from "../../../../main/ui/routes/Routes";
import styles from "./passwordRecovery1.module.css";


export const PasswordRecovery1 = () => {
    const [password, setPassword] = useState<string>('');
    const isChangedPass = useSelector<AppRootStateType, boolean>(state => state.newPassword.isChangedPass);
    const error = useSelector<AppRootStateType, string | null>(state => state.newPassword.error);
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>();

    const newPasswordHandler = () => {
        dispatch(changePassTC(password, token))
    }

    if (isChangedPass) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Create new password</h2>
                {error && <div className={styles.error}>
                    <p>{error}</p>
                    <NavLink to={PATH.FORGOT_YOUR_PASSWORD} className={styles.linkBack}>
                        <p className={styles.forgotText}>Back to reset pass</p></NavLink>
                </div>}
                <div className={styles.input}>
                    <label>
                        Password
                    </label>
                    <SuperInputPassword
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                </div>
                <p>Create new password and we will send you further instructions to email</p>
                <SuperButton onClick={newPasswordHandler}>Create new password</SuperButton>
            </Frame>
        </>
    )
}