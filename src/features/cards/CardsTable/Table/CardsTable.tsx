import React, {useState} from 'react';
import styles from './CardsTable.module.css'
import Card from "./Card";
import {CardType} from "../../../../API/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {sortCardsAC} from "../../../../main/bll/cardsReducer";

export type PropsType = {
    cards: Array<CardType>
}

type SortType = string

const CardsTable = ({cards}: PropsType) => {
    const [active, setActive] = useState<SortType>('')
    const myUserId = useSelector<AppRootStateType, string>(state => state.profilePage._id)
    let isCheckId = cards.every(m => m._id === myUserId)
    const classMyCards = `${isCheckId ? `${styles.itemMy}` : `${styles.item}`}`
    const dispatch = useDispatch();
    const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards)
    let sort = sortCards[0]
    const classActiveQuestion = `${active === 'question' && sort === '1' ? `${styles.isActiveDown}` : active === 'question' && sort === '0' ? `${styles.isActiveUp}` : ``}`
    const classActiveAnswer = `${active === 'answer' && sort === '1' ? `${styles.isActiveDown}` : active === 'answer' && sort === '0' ? `${styles.isActiveUp}` : ``}`
    const classActiveUpdated = `${active === 'updated' && sort === '1' ? `${styles.isActiveDown}` : active === 'updated' && sort === '0' ? `${styles.isActiveUp}` : ``}`
    const classActiveGrade = `${active === 'grade' && sort === '1' ? `${styles.isActiveDown}` : active === 'grade' && sort === '0' ? `${styles.isActiveUp}` : ``}`

    const sortCardsHandler = (item: string) => {
        if ((sortCards.slice(1) !== item)) {
            dispatch(sortCardsAC(sort + item))
            setActive(item)
        } else {
            if (sort === '0') {
                dispatch(sortCardsAC('1' + item))
                setActive(item)
            } else {
                dispatch(sortCardsAC('0' + item))
                setActive(item)
            }
        }
    }

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${classMyCards}`}>
                <div className={`${classActiveQuestion}`} onClick={() => sortCardsHandler('question')}>Question</div>
                <div className={`${classActiveAnswer}`} onClick={() => sortCardsHandler('answer')}>Answer</div>
                <div className={`${classActiveUpdated}`} onClick={() => sortCardsHandler('updated')}>Last Updated</div>
                <div className={`${classActiveGrade}`} onClick={() => sortCardsHandler('grade')}>Grade</div>
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