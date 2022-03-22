import React, {useEffect, useState} from 'react';
import Header from "../../main/ui/header/Header";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {PATH} from "../../main/ui/routes/Routes";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardsGradeTC, clearCardsAC, learnCardsTC} from "../../main/bll/cardsReducer";
import {AppRootStateType} from "../../main/bll/store";
import {CardType} from "../../API/cardsApi";
import SuperRadio from "../../main/ui/common/SuperRadio/SuperRadio";
import stl from './Learn.module.css'


const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const Learn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {packId} = useParams<{ packId: string }>()
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.cardPacks.filter((p: any) => p._id === packId)[0]?.name)

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [rating, setRating] = useState("")
    const [card, setCard] = useState<CardType>({
        _id: "",
        cardsPack_id: "",  // ОБЯЗАТЕЛЬНОЕ ЗНАЧЕНИЕ ДЛЯ ДОБАВЛЕНИЯ И ИЗМЕНЕНИЯ
        user_id: "",
        answer: "",
        question: "",
        grade: 0,
        shots: 0,
        comments: "",
        type: "",
        rating: 0,
        more_id: "",
        created: "",
        updated: "",
        __v: 0,
        answerImg: "",
        answerVideo: "",
        questionImg: "",
        questionVideo: "",
    });


    useEffect(() => {
        packId && dispatch(learnCardsTC(packId))
        return () => {
            dispatch(clearCardsAC())
        }
    }, [])
    useEffect(() => {
        if (cards.length > 0) setCard(getCard(cards));
        console.log(cards)
    }, [cards])

    const onNext = () => {
        if (rating) {
            setIsChecked(false);
            setRating("")

            if (cards.length > 0) {
                dispatch(CardsGradeTC(card._id, grades.findIndex(el => el === rating) + 1))
            }
        }
    }

    const cancelHandler = () => {
     navigate(PATH.PACKS, { replace: true })
    }

    const cancelStyle = {
        width: '150px',
        padding: '0'
    }


    return (
        <>
            <Header/>
            <Frame>
                <h2>Learn "{packName}"</h2>
                <h3>Question: {card.question}</h3>

                {isChecked && (
                    <>
                        <div className={stl.radioBlock}>
                            <h3><span>Answer: </span> {card.answer}</h3>
                            <h3>Rate yourself:</h3>
                            <SuperRadio
                                name={'radio'}
                                options={grades}
                                value={rating}
                                onChangeOption={setRating}
                            />
                        </div>


                    </>
                )}
                <div className={stl.btnBlock}>
                    <SuperButton onClick={cancelHandler} light={true}>Cancel</SuperButton>
                    {
                        isChecked
                            ? <SuperButton onClick={onNext} disabled={!rating}>Next</SuperButton>
                            : <SuperButton onClick={() => setIsChecked(true)} style={cancelStyle}>Show answer</SuperButton>
                    }
                </div>

            </Frame>
        </>
    );
};
