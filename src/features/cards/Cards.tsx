import React from 'react';
import styles from './Cards.module.css'
import Header from "../../main/ui/header/Header";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import CardsTable from "./CardsTable/Table/CardsTable";
import {NavLink} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";

const Cards = () => {

    return (
        <>
            <Header/>
            <PackFrame>
                <div className={styles.main}>
                    <NavLink to={PATH.PACKS}>Назад</NavLink>
                    <h2>Pack Name</h2>
                    Поиск
                    <CardsTable/>
                    Пагинация
                </div>
            </PackFrame>
        </>


    );
};

export default Cards;