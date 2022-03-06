import React, {useState} from 'react';
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import {registrationAPI} from "../../../API/api-registration";

export const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickHandler = () => {
    registrationAPI.register(email, password).then(res => console.log(res))
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
