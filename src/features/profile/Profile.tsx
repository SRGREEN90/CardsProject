import React, {ChangeEvent, useRef, useState} from 'react';
import {Navigate} from 'react-router-dom';
import styles from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import noAvatar from './noAvatar.png'
import {updateProfile} from "../../main/bll/profileReducer";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperEditableSpan from "../../main/ui/common/SuperEditableSpan/SuperEditableSpan";
import {PATH} from "../../main/ui/routes/Routes";
import Preloader from "../../main/ui/common/Preloader/Preloader";
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import Modal from "../../main/ui/common/Modal/Modal";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";

export const Profile = () => {
  const dispatch = useDispatch();
  const profileName = useSelector<AppRootStateType, string>(state => state.profilePage.name);
  const profileAvatar = useSelector<AppRootStateType, string>(state => state.profilePage.avatar);
  const profileEmail = useSelector<AppRootStateType, string>(state => state.profilePage.email);
  const error = useSelector<AppRootStateType, string | undefined>(state => state.profilePage.error);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

  const inRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [fileURL, setFileURL] = useState<string>()
  const [file64, setFile64] = useState<string | ArrayBuffer | null>();

  const [name, setName] = useState(profileName)
  const [newLink, setNewLink] = useState<string>('')
  const [localErr, setLocalErr] = useState<string>('')
  const [isModal, setIsModal] = useState<boolean>(false)

  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile64(reader.result);
    }
    const newFile = e.target.files && e.target.files[0];

    if (newFile) {
      setFile(newFile);
      setFileURL(window.URL.createObjectURL(newFile));

      reader.readAsDataURL(newFile);
    }
    setNewLink('')
  }
  const saveAvatarHandler = () => {
    typeof(file64) === 'string' && dispatch(updateProfile({avatar: file64}))
    newLink && dispatch(updateProfile({avatar: newLink}))
    closeModal()
  }
const onChangeLink = (e:ChangeEvent<HTMLInputElement>) => {
  setNewLink(e.currentTarget.value)
  setFile(undefined)
  setFile64(null)
  setFileURL(undefined)
}
  const onBlurNameHandler = () => {
    onSubmitName();
  }
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (localErr) setLocalErr('')
    setName(e.currentTarget.value.trim())
  };

  const onEnterHandler = () => {
    onSubmitName();
  }

  const onSubmitName = () => {
    if (name.length > 10) {
      setLocalErr('Name should be less then 11 symbols!')
      setName(profileName)
      return
    }
    if (name && (name !== profileName)) {
      dispatch(updateProfile({name}));
    }
    if (name.trim() === '') {
      setName(profileName);
    }
  }


  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }
  return (
    <>
      <Header/>
      {loading && <Preloader/>}
      <Frame>
        <span><strong>It-incubator</strong></span>
        <p className={styles.profileTitle}>Your profile</p>
        <div>
          <div className={styles.avatar}>
            <img src={profileAvatar ? profileAvatar : noAvatar}
                 alt="avatar"/>
          </div>
          <div className={styles.info}>
            <span>Name: &#160;</span>
            {
              <SuperEditableSpan value={name} type="text"
                                 style={{height: "27px", width: "150px"}}
                                 onChange={changeNameHandler}
                                 onBlur={onBlurNameHandler}
                                 onEnter={onEnterHandler}
                                 autoFocus
              />
            }
          </div>
          <div className={styles.info}>Email: {profileEmail}</div>
        </div>
        <div className={styles.error}>
          {error && <span>error: {error}</span>}
          {localErr && <span>Note: {localErr}</span>}
        </div>
        <SuperButton onClick={showModal} light={true}>Change avatar</SuperButton>
      </Frame>
      <Modal title={'Profile Avatar'} show={isModal} closeModal={closeModal}>
        <label>Insert new link or add jpg file</label>
        <SuperInputText value={newLink} onChange={onChangeLink}  placeholder={'Insert new link'}/>
        <input
          ref={inRef}
          type={'file'}
          style={{display: 'none'}}
          onChange={upload}
        />
        <SuperButton onClick={() => inRef && inRef.current && inRef.current.click()}>Add file</SuperButton>
        <div className={styles.avatar}>
          <img src={fileURL ? fileURL : noAvatar}
               alt="avatar"/>
        </div>
        <div>name: {file && file.name}</div>
        <div>size: {file && returnFileSize(file.size)}</div>
        <div>type: {file && file.type}</div>
        <ModalButtonsWrap closeModal={closeModal}>
          <SuperButton onClick={saveAvatarHandler}>Save</SuperButton>
        </ModalButtonsWrap>
      </Modal>
    </>
  );
};

const returnFileSize = (n: number) => {
  if (n < 1024) {
    return n + 'bytes';
  } else if (n > 1024 && n < 1048576) {
    return (n / 1024).toFixed(2) + 'KB';
  } else if (n > 1048576) {
    return (n / 1048576).toFixed(2) + 'MB';
  }
};