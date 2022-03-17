import React, {ChangeEvent} from "react";
import s from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {useParams} from "react-router-dom";
import {setFilteredPacksAC} from "../../../bll/cardsPackReducer";



export const PacksSearch = () => {
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName);
    const dispatch = useDispatch()
    const {packId} = useParams()


    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilteredPacksAC(e.currentTarget.value))
    };


    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search"
                value={packName}
                onChange={handleChange}
            />
        </div>
    );
}