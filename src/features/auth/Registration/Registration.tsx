import React, {useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "../../../main/bll/registerReducer";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate} from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();
  const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickHandler = () => {
    dispatch(registerTC(email, password))
  }

  if (isRegistered) {
    return <Navigate to={"/login"}/>
  }
  return (
    <div>
      Registration
      <div>
        <label>
          Email
        </label>
        <SuperInputText value={email} onChangeText={setEmail}/>
        <label>
          Password
        </label>
        <SuperInputText value={password} onChangeText={setPassword} />
      </div>

      <SuperButton onClick={onClickHandler}>Register</SuperButton>
    </div>
  );
};
