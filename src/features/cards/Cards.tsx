import React, {useEffect} from 'react';
import styles from './Cards.module.css'
import Header from "../../main/ui/header/Header";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import CardsTable from "./CardsTable/Table/CardsTable";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {fetchCardsTC} from "../../main/bll/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {Search} from "../../main/ui/common/GridinSearch/Search";

const Cards = () => {
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStateType, any>(state => state.cards.cards);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const cardQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardQuestion)
    const cardAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardAnswer)
    const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards)

    const {packId} = useParams<{ packId: string }>();

    useEffect(() => {
        if (packId) {
            dispatch(fetchCardsTC(packId))
        }
    }, [page, pageCount, cardQuestion, cardAnswer, sortCards])


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Header/>
            <PackFrame>
                <div className={styles.main}>
                    <NavLink to={PATH.PACKS}>Назад</NavLink>
                    <h2>Pack Name</h2>
                    <Search />
                    <CardsTable cards={cards}/>
                    Пагинация
                </div>
            </PackFrame>
        </>


    );
};

export default Cards;