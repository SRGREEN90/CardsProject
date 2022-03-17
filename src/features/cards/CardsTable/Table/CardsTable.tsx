import React from 'react';
import styles from './CardsTable.module.css'
import Card from "./Card";
import {CardType} from "../../../../API/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {sortCardsAC} from "../../../../main/bll/cardsReducer";
import {sortFields} from "../../../../utilits/functionsCommon/sortingField";

export type PropsType = {
    cards: Array<CardType>
}

const CardsTable = ({cards}: PropsType) => {
    const dispatch = useDispatch();
    const myUserId = useSelector<AppRootStateType, string>(state => state.profilePage._id)
    let isCheckId = cards.every(m => m._id === myUserId)
    const classMyCards = `${isCheckId ? `${styles.itemMy}` : `${styles.item}`}`
    const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards)
    const isLoading =useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const direction = sortCards[0]
    const activeField = sortCards.slice(1)
    const rotate = direction === "1" ? styles.up : ""

    // const sortFields = (field: string) => {
    //     if (isLoading) return
    //     if (sortCards.slice(1) !== field) {
    //         dispatch(sortCardsAC('0' + field))
    //     } else {
    //         if (sortCards[0] !== '0') {
    //             dispatch(sortCardsAC('0' + field))
    //         } else {
    //             dispatch(sortCardsAC('1' + field))
    //         }
    //     }
    // }

    const sortUpdate = () => sortFields('updated', sortCardsAC, isLoading, sortCards, dispatch)
    const sortQuestion = () => sortFields('question', sortCardsAC, isLoading, sortCards, dispatch)
    const sortAnswer = () => sortFields('answer', sortCardsAC, isLoading, sortCards, dispatch)
    const sortGrade = () => sortFields('grade', sortCardsAC, isLoading, sortCards, dispatch)

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${classMyCards}`}>
                <div onClick={sortQuestion} className={activeField === "question" ? `${styles.active} ${rotate}` : ""} >Question</div>
                <div onClick={sortAnswer} className={activeField === "answer" ? `${styles.active} ${rotate}` : ""}>Answer</div>
                <div onClick={sortUpdate} className={activeField === "updated" ? `${styles.active} ${rotate}` : ""}>Last Updated</div>
                <div onClick={sortGrade} className={activeField === "grade" ? `${styles.active} ${rotate}` : ""}>Grade</div>
                {
                    isCheckId && <>
                        <div>Actions</div>
                    </>
                }
            </div>
            {
                cards.length > 0
                    ? cards.map(card => <Card key={card._id} card={card} isCheckId={isCheckId}
                                              classMyCards={classMyCards}/>)
                    : <div style={{padding: '16px 24px'}}>Nothing found</div>
            }
        </div>
    );
};

export default CardsTable;