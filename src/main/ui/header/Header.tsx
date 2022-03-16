import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import styles from './Header.module.css';
import profileIcon from '../../../assets/images/Profile.png'
import packsListIcon from '../../../assets/images/Packslist.png'
import {logoutTC} from "../../bll/loginReducer";
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={styles.header}>
            <nav>
                {/*<NavLink to={PATH.TEST}>TEST </NavLink>*/}
                <NavLink to={PATH.PACKS} className={(navData) => navData.isActive ? styles.isActive : ""}>
                    <img src={packsListIcon} alt={'packsListIcon'}/>Packs list
                </NavLink>
                <NavLink to={PATH.PROFILE} className={(navData) => navData.isActive ? styles.isActive : ""}>
                    <img src={profileIcon} alt={'profileIcon'}/>Profile
                </NavLink>
                {/*<NavLink to={PATH.LOGIN}>LOGIN </NavLink>*/}
                {/*<NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>*/}
                {/*<NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>*/}

                {/*<NavLink to={PATH.FORGOT_YOUR_PASSWORD}>FORGOT_YOUR_PASSWORD </NavLink>*/}

                {/*<NavLink to={PATH.PASSWORD_RECOVERY}>PASSWORD_RECOVERY </NavLink>*/}

                {/*<NavLink to={PATH.CHECK_EMAIL}>CHECK_EMAIL</NavLink>*/}
            </nav>
            <div className={styles.btnLogoutContainer}>
                <button  className={styles.btnLogout} onClick={logOutHandler}>Log Out</button>
            </div>
        </header>
    )
};

export default Header;
// <NavLink to={PATH.PACKS} className={classActivePacks} onClick={() => setIsActive('packs')}>
//   <img src={packsListIcon} alt={'packsListIcon'}/>Packs list
// </NavLink>
// {/*<NavLink to={PATH.PROFILE} className={classActiveProfile} onClick={() => setIsActive('profile')}>*/}
// {/*  <img src={profileIcon} alt={'profileIcon'}/>Profile*/}
// {/*</NavLink>*/}