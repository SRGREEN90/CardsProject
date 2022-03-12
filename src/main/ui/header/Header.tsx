import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <NavLink to={PATH.TEST}>TEST </NavLink>
                <NavLink to={PATH.PROFILE}>PROFILE </NavLink>
                <NavLink to={PATH.LOGIN}>LOGIN </NavLink>
                <NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>
                <NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>

                <NavLink to={PATH.FORGOT_YOUR_PASSWORD}>FORGOT_YOUR_PASSWORD </NavLink>

                <NavLink to={PATH.PASSWORD_RECOVERY}>PASSWORD_RECOVERY </NavLink>

                <NavLink to={PATH.CHECK_EMAIL}>CHECK_EMAIL</NavLink>
            </nav>
        </header>
    )
};

export default Header;
