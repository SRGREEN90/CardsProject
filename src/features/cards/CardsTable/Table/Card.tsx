import React from 'react';
import styles from "./CardsTable.module.css";
import {CardType} from "../../../../API/cardsApi";

type CardPropsType = {
    card: CardType
    isCheckId: boolean
    classMyCards: string
}

const Card: React.FC<CardPropsType> = ({card, isCheckId, classMyCards}) => {
    const [year, month, day] = card.updated.slice(0, 10).split('-')

    return (
        <div>
            <div className={`${styles.card} ${classMyCards}`}>
                <div>{card.question}</div>
                <div>{card.answer}</div>
                <div>{`${day}.${month}.${year}`}</div>
                <div>{card.grade.toFixed(2)}</div>
                {
                    isCheckId && <div className={styles.buttons}>
                        <>
                            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            <button className={styles.button}>Edit</button>
                        </>
                    </div>
                }
            </div>
        </div>
    );
};

export default Card;