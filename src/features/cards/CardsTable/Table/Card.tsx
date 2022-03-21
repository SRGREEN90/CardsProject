import React from 'react';
import styles from "./CardsTable.module.css";
import {CardType} from "../../../../API/cardsApi";
import Preloader from "../../../../main/ui/common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {SuperLoading} from "../../../../main/ui/common/Loading/loading";
import {deleteCardTC, updateCardTC} from "../../../../main/bll/cardsReducer";
import {useParams} from "react-router-dom";

type CardPropsType = {
    card: CardType
    isCheckId: boolean
    classMyCards: string
}

const Card: React.FC<CardPropsType> = ({card, isCheckId, classMyCards}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const [year, month, day] = card.updated.slice(0, 10).split('-')
    let rating = +card.grade.toFixed(0)
    const finalClass1 = `${1 <= rating ? `${styles.active}` : ``}`
    const finalClass2 = `${2 <= rating ? `${styles.active}` : ``}`
    const finalClass3 = `${3 <= rating ? `${styles.active}` : ``}`
    const finalClass4 = `${4 <= rating ? `${styles.active}` : ``}`
    const finalClass5 = `${5 <= rating ? `${styles.active}` : ``}`

    const {packId} = useParams<{ packId: string }>();
    const currId = packId ? packId : ''

    if (isLoading) {
        return <SuperLoading/>
    }

    const deleteCard = () => {
        dispatch(deleteCardTC(currId, card._id))
    }

    const updateCard = () => {
        dispatch(updateCardTC(currId, card._id, 'angular', 'framework'))
    }

    return (
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
                            <button className={`${styles.button} ${styles.delete}`} onClick={deleteCard}>Delete</button>
                            <button className={styles.button} onClick={updateCard}>Edit</button>
                        </>
                    </div>
                }
            </div>
    );
};

export default Card;