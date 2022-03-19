import React, {useEffect} from 'react';
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

  useEffect(()=>{
    packId && dispatch(learnCardsTC(packId))
    return () => {dispatch(clearCardsAC())}
  }, [])
  console.log(cards)

  return (
    <>
      <Header/>
      <Frame>
        <h3>Learn</h3>
        <NavLink to={PATH.PACKS}><SuperButton>Cancel</SuperButton></NavLink>

      </Frame>
    </>
  );
};
