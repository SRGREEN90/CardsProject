import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import styles from './Header.module.css';
import profileIcon from '../../../assets/images/Profile.png'
import packsListIcon from '../../../assets/images/Packslist.png'

const Header = () => {
    const [isActive, setIsActive] = useState<'profile' | 'packs'>('packs')

    const classActiveProfile = `${isActive === "profile" ? styles.isActive : ''}`
    const classActivePacks = `${isActive === "packs" ? styles.isActive : ''}`


    return (
        <header className={styles.header}>
            <nav>
                {/*<NavLink to={PATH.TEST}>TEST </NavLink>*/}
                <NavLink to={PATH.PACKS} className={classActivePacks} onClick={() => setIsActive('packs')}><img src={packsListIcon} alt={'packsListIcon'}/>Packs list</NavLink>
                <NavLink to={PATH.PROFILE} className={classActiveProfile} onClick={() => setIsActive('profile')}><img src={profileIcon} alt={'profileIcon'}/>Profile </NavLink>
                {/*<NavLink to={PATH.LOGIN}>LOGIN </NavLink>*/}
                {/*<NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>*/}
                {/*<NavLink to={PATH.REGISTRATION}>REGISTRATION </NavLink>*/}

                {/*<NavLink to={PATH.FORGOT_YOUR_PASSWORD}>FORGOT_YOUR_PASSWORD </NavLink>*/}

                {/*<NavLink to={PATH.PASSWORD_RECOVERY}>PASSWORD_RECOVERY </NavLink>*/}

                {/*<NavLink to={PATH.CHECK_EMAIL}>CHECK_EMAIL</NavLink>*/}
            </nav>
        </header>
    )
};

export default Header;
