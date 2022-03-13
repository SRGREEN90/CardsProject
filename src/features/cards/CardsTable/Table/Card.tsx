import React from 'react';
import styles from "./CardsTable.module.css";
import {CardType} from "./CardsTable";

type CardPropsType = {
    card: CardType
}

const Card: React.FC<CardPropsType> = ({card}) => {
    return (
        <div className={`${styles.card} ${styles.item}`}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>{card.updated.slice(0, 10)}</div>
            <div>{card.grade.toFixed(2)}</div>
        </div>
    );
};

export default Card;