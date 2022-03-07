import React from 'react';
import {Routes, Route, useParams} from "react-router-dom";
import {Login} from '../../../features/auth/Login/Login';
import {Registration} from "../../../features/auth/Registration/Registration";
import {Error404} from "../common/Error/Error404";
import {Profile} from "../../../features/profile/Profile";
import {Test} from "../../../features/Test";
import PasswordRecovery from "../../../features/auth/PasswordRecovery/PasswordRecovery";
import ForgotYourPassword from '../../../features/auth/PasswordRecovery/ForgotYourPassword';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    PROFILE: '/profile',
    NEW_PASSWORD: '/newPassword',
    TEST: '/test',
    SET_NEW_PASSWORD:'/set-new-password',
    PASSWORD_RECOVERY: '/password-recovery',
    CARDS: '/cards',
    FORGOT_YOUR_PASSWORD: '/forgot',
}

export const RoutesComponent = () => {



    return (
        <>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<div>NEW_PASSWORD</div>}/>
                <Route path={PATH.SET_NEW_PASSWORD} element={<div>SET_NEW_PASSWORD</div>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.FORGOT_YOUR_PASSWORD} element={<ForgotYourPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={"/*"} element={<Error404/>}/>
            </Routes>
        </>
    );
};