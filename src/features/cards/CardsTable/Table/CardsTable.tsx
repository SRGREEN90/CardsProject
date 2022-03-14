import React from 'react';
import styles from './CardsTable.module.css'
import Card from "./Card";
import {CardType} from "../../../../API/cardsApi";
import Pack from "../../../packsList/PacksTable/Table/Pack";

// export type CardsType = {
//     answer: string
//     question: string
//     cardsPack_id: string
//     grade: number
//     shots: number
//     user_id: string
//     created: string
//     updated: string
//     _id: string
// }

export type PropsType = {
    cards: Array<CardType>
}


const CardsTable = ({cards}: PropsType) => {
    // const cardsExample: Array<CardType> = [
    //     {
    //         question: "no answer",
    //         answer: "no question",
    //         cardsPack_id: "5eb6a2f72f849402d46c6ac4",
    //         grade: 4.987525071790364,
    //         shots: 1,
    //         user_id: "142151531535151",
    //         created: "2020-05-13T11:05:44.867Z",
    //         updated: "2020-05-13T11:05:44.867Z",
    //         _id: "5ebbd48876810f1ad0e7ece33",
    //     }, {
    //         question: "Какой-то большой вопрос",
    //         answer: "Правильный ответ",
    //         cardsPack_id: "5eb6a2f72f849402d46c6ac4",
    //         grade: 4.987525071790364,
    //         shots: 1,
    //         user_id: "142151531535151",
    //         created: "2020-05-13T11:05:44.867Z",
    //         updated: "2020-05-13T11:05:44.867Z",
    //         _id: "5ebbd48876810f1ad0e7ece32",
    //     }, {
    //         question: "CRUD",
    //         answer: "create read update delete",
    //         cardsPack_id: "5eb6a2f72f849402d46c6ac4",
    //         grade: 4.987525071790364,
    //         shots: 1,
    //         user_id: "142151531535151",
    //         created: "2020-05-13T11:05:44.867Z",
    //         updated: "2020-05-13T11:05:44.867Z",
    //         _id: "5ebbd48876810f1ad0e7ece31",
    //     },
    // ]

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div>Question</div>
                <div>Answer</div>
                <div>Last Updated</div>
                <div>Grade</div>
            </div>
            {
                cards.length > 0
                ? cards.map(card => <Card key={card._id} card={card}/>)
                : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>
            }
        </div>
    );
};

export default CardsTable;