import React, {useEffect, useState} from 'react';
import Header from "../../main/ui/header/Header";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {PATH} from "../../main/ui/routes/Routes";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCardsAC, learnCardsTC} from "../../main/bll/cardsReducer";
import {AppRootStateType} from "../../main/bll/store";
import {CardType} from "../../API/cardsApi";


export const Learn = () => {
  const dispatch = useDispatch()
  const {packId} = useParams<{ packId: string }>()
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.cardPacks.filter((p: any) => p._id === packId)[0]?.name)


// const filterQuestion = (cards: Array<CardType>) => {
//   let i = cards.length - 1
//   for (; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = cards[i];
//     cards[i] = cards[j];
//     cards[j] = temp;
//   }
//   return cards
// }


  useEffect(()=>{
    packId && dispatch(learnCardsTC(packId))
    return () => {dispatch(clearCardsAC())}
  }, [])


  return (
    <>
      <Header/>
      <Frame>
        <h1>Learn "{packName}"</h1>
        <h3>Question: {}"</h3>
        <NavLink to={PATH.PACKS}><SuperButton style={{backgroundColor: '#D7D8EF', color: '#21268F'}}>Cancel</SuperButton></NavLink>
        <NavLink to={PATH.ANSWER}><SuperButton>Show answer</SuperButton></NavLink>

      </Frame>
    </>
  );
};
