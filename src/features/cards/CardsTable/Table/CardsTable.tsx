import React from 'react';
import styles from './CardsTable.module.css'
import Card from "./Card";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

const CardsTable = () => {
    const cardsExample: Array<CardType> = [
        {
            question: "no answer",
            answer: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece33",
        }, {
            question: "Какой-то большой вопрос",
            answer: "Правильный ответ",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece32",
        }, {
            question: "CRUD",
            answer: "create read update delete",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece31",
        },
    ]

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div>Question</div>
                <div>Answer</div>
                <div>Last Updated</div>
                <div>Grade</div>
            </div>
            {cardsExample.map(card => <Card key={card._id} card={card}/>)}
        </div>


    );
};

export default CardsTable;