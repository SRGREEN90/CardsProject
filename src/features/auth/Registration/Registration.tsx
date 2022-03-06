import React, {useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setRegisterError} from "../../../main/bll/registerReducer";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate} from "react-router-dom";
import styles from './Registration.module.css';

export const Registration = () => {
  const dispatch = useDispatch();
  const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
  const error = useSelector<AppRootStateType, string>(state => state.register.errorRegister)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onClickHandler = () => {
    if (password !== confirmPassword) {
      dispatch(setRegisterError('Password and confirmation password do not match'))
    } else {
      dispatch(registerTC(email, password))
    }
  }

  if (isRegistered) {
    return <Navigate to={"/login"}/>
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <span><strong>It-incubator</strong></span>
        <h2>Sign up</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.input}>
          <label>
            Email
          </label>
          <SuperInputText value={email} onChangeText={setEmail}/>
        </div>
        <div className={styles.input}>
          <label>
            Password
          </label>
          <SuperInputText value={password} onChangeText={setPassword}/>
        </div>
        <div className={styles.input}>
          <label>
            Confirm password
          </label>
          <SuperInputText value={confirmPassword} onChangeText={setConfirmPassword}/>
        </div>

        <SuperButton onClick={onClickHandler}>Register</SuperButton>
      </div>

    </div>
  );
};
