import React, {useState} from 'react';
import styles from './login.module.css';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import SuperCheckbox from "../../../main/ui/common/SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {loginTC, StateLoginType} from "../../../main/bll/loginReducer";
import {Navigate, NavLink} from "react-router-dom"
import {PATH} from "../../../main/ui/routes/Routes";
import {SuperLoading} from "./SuperLoading";

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const loginStatus = useSelector<AppRootStateType, StateLoginType>(state => state.login);
    const dispatch = useDispatch();

    const loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(loginTC(email, password, rememberMe));
    };

    if (loginStatus.status) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={styles.containerLogin}>
            {loginStatus.loading && <SuperLoading/>}
            <SuperLoading/>
            <form>
                <p>Email</p>
                <SuperInputText
                    error={loginStatus.error}
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}/>
                <p>Password</p>
                <SuperInputText
                    error={loginStatus.error}
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}/>
                <div className={styles.containerCheckbox}>
                    <SuperCheckbox checked={rememberMe}
                                   onChange={() => setRememberMe(!rememberMe)}/>
                    <p>Remember me</p>
                </div>
            </form>
            {/*{loginStatus.error && <span>{loginStatus.error}</span>}*/}
            <NavLink to={PATH.PASSWORD_RECOVERY}><p className={styles.forgotText}>Forgot Password</p></NavLink>
            <SuperButton onClick={loginHandler}>Login</SuperButton>
            <NavLink to={PATH.REGISTRATION}><p className={styles.signUpText}>Sign Up</p></NavLink>
        </div>
    );
};
