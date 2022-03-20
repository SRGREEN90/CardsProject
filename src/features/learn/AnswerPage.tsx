import React, {useEffect, useState} from 'react';
import Header from "../../main/ui/header/Header";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {PATH} from "../../main/ui/routes/Routes";
import {NavLink, useParams} from "react-router-dom";
import {CardType} from "../../API/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {CardsGradeTC} from "../../main/bll/cardsReducer";


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)
    return cards[res.id + 1];
}

export const AnswerPage = () => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);

    //const {cards} = useSelector((store: AppStoreType) => store.cards);
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const {id} = useParams();

    // const {packId} = useParams<{ packId: string }>()

    type InitialStateType = {
        _id: string,
        cardsPack_id: string,
        answer: string,
        question: string,
        grade: number,
        shots: number,
        type: string,
        rating: number,
        more_id: string,
        created: string,
        updated: string,
    }
    const [card, setCard] = useState<InitialStateType>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (first) {
           // dispatch(CardsGradeTC());
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
        return () => {
        }
    }, [dispatch, id, cards, first]);


    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {

        }
    }

    return (
        <>
            <Header/>
            <Frame>
                <h1>Learn 'Pack Name'</h1>
                <h3>Question:</h3>
                <h3>Answer:</h3>
                <h3>Rate yourself:</h3>

                {/*{isChecked && (*/}
                {/*    <>*/}
                {/*        <div>{card.answer}</div>*/}

                {/*        {grades.map((g, i) => (*/}
                {/*            <SuperButton key={'grade-' + i} onClick={() => {*/}
                {/*            }}>{g}</SuperButton>*/}
                {/*        ))}*/}

                        <NavLink to={PATH.PACKS}><SuperButton
                            style={{backgroundColor: '#D7D8EF', color: '#21268F'}}>Cancel</SuperButton></NavLink>
                        <SuperButton onClick={onNext}>Next</SuperButton>
                {/*    </>*/}
                {/*)}*/}


            </Frame>
        </>
    );
};
