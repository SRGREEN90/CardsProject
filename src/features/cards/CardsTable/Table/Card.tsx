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
    let rating = +card.grade.toFixed(0)
    const finalClass1 = `${1 <= rating ? `${styles.active}` : ``}`
    const finalClass2 = `${2 <= rating ? `${styles.active}` : ``}`
    const finalClass3 = `${3 <= rating ? `${styles.active}` : ``}`
    const finalClass4 = `${4 <= rating ? `${styles.active}` : ``}`
    const finalClass5 = `${5 <= rating ? `${styles.active}` : ``}`

    return (
        <div>
            <div className={`${styles.card} ${classMyCards}`}>
                <div>{card.question}</div>
                <div>{card.answer}</div>
                <div>{`${day}.${month}.${year}`}</div>
                <div>
                    <div className={styles.rating_result}>
                        <span className={finalClass1}></span>
                        <span className={finalClass2}></span>
                        <span className={finalClass3}></span>
                        <span className={finalClass4}></span>
                        <span className={finalClass5}></span>
                    </div>
                </div>
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