import React from 'react';
import styles from './CardsTable.module.css'
import Card from "./Card";
import {CardType} from "../../../../API/cardsApi";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";

export type PropsType = {
    cards: Array<CardType>
}

const CardsTable = ({cards}: PropsType) => {
    const myUserId = useSelector<AppRootStateType, string>(state => state.profilePage._id)
    let isCheckId = cards.every(m => m._id === myUserId)
    const classMyCards = `${isCheckId ? `${styles.itemMy}` : `${styles.item}`}`

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${classMyCards}`}>
                <div>Question</div>
                <div>Answer</div>
                <div>Last Updated</div>
                <div>Grade</div>
                {
                    isCheckId && <>
                        <div>Actions</div>
                    </>
                }
            </div>
            {
                cards.length > 0
                ? cards.map(card => <Card key={card._id} card={card} isCheckId={isCheckId} classMyCards={classMyCards}/>)
                : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>
            }
        </div>
    );
};

export default CardsTable;