import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Navigate} from 'react-router-dom';
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import styles from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import noAvatar from './noAvatar.png'
import {updateProfile} from "../../main/bll/profileReducer";
import {Frame} from "./Frame";

export const Profile = () => {
  const dispatch = useDispatch();
  const profileName = useSelector<AppRootStateType, string>(state => state.profilePage.name);
  const profileAvatar = useSelector<AppRootStateType, string>(state => state.profilePage.avatar);
  const profileEmail = useSelector<AppRootStateType, string>(state => state.profilePage.email);
  const error = useSelector<AppRootStateType, string>(state => state.profilePage.error);
  //const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn);
  const isLoggedIn = true

  const [name, setName] = useState(profileName);
  const [editName, setEditName] = useState(false);

  const onDoubleClickNameHandler = () => setEditName(true);
  const onBlurNameHandler = () => {
    setEditName(false);
    onSubmitName();
  }
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value.trim())
  };

  const selectAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  };
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditName(false);
      onSubmitName();
    }
  }

  const onSubmitName = () => {
    if (name && (name !== profileName)) {
      dispatch(updateProfile({name}));
    }
    if (name.trim() === '') {
      setName(profileName);
    }
  }


  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }
  return (
    <Frame>
      <>
        <h3>Your profile</h3>
        <div>
          <div className={styles.avatar}>
            <img src={profileAvatar ? profileAvatar : noAvatar}
                 alt="avatar"/>
          </div>
          <div className={styles.info}>
            {
              editName ?
                <input value={name}  type="text"
                       onChange={changeNameHandler}
                       onBlur={onBlurNameHandler}
                       onFocus={selectAllHandler}
                       onKeyPress={onEnterHandler}
                       autoFocus
                />
                :
                <span onDoubleClick={onDoubleClickNameHandler}>
                                    Name: {profileName}
                                </span>
            }
          </div>
          <div className={styles.info}>Email: {profileEmail}</div>
        </div>
        <div>
          <SuperButton>Log Out</SuperButton>
        </div>
      </>
    </Frame>

  );
};