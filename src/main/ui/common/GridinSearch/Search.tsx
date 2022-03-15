import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {fetchCardsTC, setFilterReducerAC} from "../../../bll/cardsReducer";
import {useParams} from "react-router-dom";



export const Search = () => {
    //const cardQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardQuestion);
    const cardAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardAnswer);
    const {packId} = useParams()

const dispatch = useDispatch()
    const handleChange = (e:  ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterReducerAC(e.currentTarget.value))
    };

    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search"
                value={cardAnswer}
                onChange={handleChange}
            />
        </div>
    );
}