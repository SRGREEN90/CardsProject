import React, {useEffect} from 'react';
import styles from './Cards.module.css'
import Header from "../../main/ui/header/Header";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import CardsTable from "./CardsTable/Table/CardsTable";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {changeCurrentPageCardsAC, fetchCardsTC, setPageCountCardsAC} from "../../main/bll/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {CardType} from "../../API/cardsApi";
import {Pagination} from "../../main/ui/common/Pagination/Pagination";
import {CardsSearch} from "../../main/ui/common/GridinSearch/CardsSearch";
import {PageSizeSelector} from "../../main/ui/pageSizeSelector/PageSizeSelector";
import backPage from "../../assets/images/backPage.svg"

const Cards = () => {
    const dispatch = useDispatch();
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName);
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const cardQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardQuestion)
    const cardAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardAnswer)
    const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const {packId} = useParams<{ packId: string }>();

    useEffect(() => {
        if (packId) {
            dispatch(fetchCardsTC(packId))
        }
    }, [page, pageCount, cardQuestion, cardAnswer, sortCards])


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const onChangedPage = (newPage: number) => {
        if (newPage !== page) dispatch(changeCurrentPageCardsAC(newPage))
    }

    const pageSizeHandler = (value: number) => {
        dispatch(setPageCountCardsAC(value))
    }

    return (
        <>
            <Header/>
            <PackFrame>
                <div className={styles.main}>
                    <NavLink to={PATH.PACKS}><img src={backPage} alt={"backPage"}/></NavLink>
                    <h2>{packName}</h2>
                    <div className={styles.search}>
                        <CardsSearch/>
                    </div>
                    <CardsTable cards={cards}/>
                    <div className={styles.paginationWrapper}>
                        {
                            cardsTotalCount < pageCount
                                ? <></>
                                : <>
                                    <Pagination totalCount={cardsTotalCount} pageSize={pageCount} currentPage={page}
                                                onChangedPage={onChangedPage}/>
                                    <PageSizeSelector pageCount={pageCount} handler={pageSizeHandler}/>
                                </>
                        }
                    </div>
                </div>
            </PackFrame>
        </>
    );
};

export default Cards;