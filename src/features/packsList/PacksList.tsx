import React from 'react';
import styles from './PacksList.module.css'
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import PacksTable from "./PacksTable/Table/PacksTable";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import Sidebar from "../../main/ui/Sidebar/Sidebar";

const PacksList = () => {

    return (
        <>
            <Header/>
            <PackFrame>
                <Sidebar/>
                <div className={styles.main}>
                    <h2>Packs list</h2>
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