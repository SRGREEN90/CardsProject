import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from './PackSearch.module.css'
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {changeCurrentPageAC, setFilteredPacksAC} from "../../../bll/cardsPackReducer";


export const PacksSearch = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()

    let [event, setEvent] = useState<string>('')

    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)
    };

    let BtnHandler = () => {
        dispatch(setFilteredPacksAC(event))
        dispatch(changeCurrentPageAC(1))
    }

    const onKeyPressBtnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            BtnHandler()
        }
    }


    return (
        <div className={s.wrap}>
            <input
                onKeyPress={onKeyPressBtnHandler}
                type="text"
                placeholder="Search..."
                value={event}
                onChange={handleChange}
            />
            <button onClick={BtnHandler} className={s.btnSearch}></button>
        </div>
    );
}

