import React, {useEffect} from 'react';
import styles from './PacksList.module.css'
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import PacksTable from "./PacksTable/Table/PacksTable";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import Sidebar from "../../main/ui/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {fetchPacksListsTC} from "../../main/bll/cardsPackReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {PackType} from "../../API/cardsPackApi";

const PacksList = () => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string>(state => state.app.error);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);


    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)
    const min = useSelector<AppRootStateType, number>(state => state.cardsPack.min)
    const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
    const page = useSelector<AppRootStateType, number>(state => state.cardsPack.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cardsPack.pageCount)

    useEffect(() => {
        dispatch(fetchPacksListsTC())
    }, [min, max, page, pageCount])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Header/>
            <PackFrame>
                <Sidebar/>
                <div className={styles.main}>
                    <h2>Packs list</h2>
                    {error ? <div style={{color:'red'}}>{error}</div> : ''}
                    Поиск
                    <SuperButton>Add new pack</SuperButton>
                    <PacksTable/>
                    Пагинация
                </div>
            </PackFrame>
        </>


    );
};

export default PacksList;