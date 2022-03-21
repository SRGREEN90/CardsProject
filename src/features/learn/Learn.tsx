import React, {useEffect, useState} from 'react';
import Header from "../../main/ui/header/Header";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {PATH} from "../../main/ui/routes/Routes";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardsGradeTC, clearCardsAC, learnCardsTC} from "../../main/bll/cardsReducer";
import {AppRootStateType} from "../../main/bll/store";
import {CardType} from "../../API/cardsApi";
import SuperRadio from "../../main/ui/common/SuperRadio/SuperRadio";

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
        //setCard(getCard(cards));
      }
    }
  }

  return (
    <>
      <Header/>
      <Frame>
        <h2>Learn "{packName}"</h2>
        <h3>Question: {card.question}</h3>
        {isChecked && (
          <>
            <div>Answer: {card.answer}</div>
            <div>Rate yourself:</div>
            <SuperRadio
              name={'radio'}
              options={grades}
              value={rating}
              onChangeOption={setRating}
            />
            {/*{grades.map((g, i) => (*/}
            {/*  <SuperButton key={'grade-' + i} onClick={() => {*/}
            {/*  }}>{g}</SuperButton>*/}
            {/*))}*/}

          </>
        )}
        <NavLink to={PATH.PACKS}><SuperButton
          style={{backgroundColor: '#D7D8EF', color: '#21268F'}}>Cancel</SuperButton></NavLink>
        {/*<NavLink to={PATH.ANSWER}><SuperButton>Show answer</SuperButton></NavLink>*/}
        {
          isChecked
            ? <SuperButton onClick={onNext}>Next</SuperButton>
            : <SuperButton onClick={() => setIsChecked(true)}>Show answer</SuperButton>
        }
      </Frame>
    </>
  );
};
