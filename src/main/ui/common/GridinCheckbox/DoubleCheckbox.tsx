import React from "react";
import s from './DoubleCheckbox.module.css'
import {setFilteredPacksAC, setMyPacksAC} from "../../../bll/cardsPackReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {PacksSearch} from "../GridinSearch/PacksSearch";


export const DoubleCheckbox = () => {
  const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks);
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
  const dispatch = useDispatch()

    const myOnClickHandler = () => {
        dispatch(setMyPacksAC(true))
    }
    const allOnClickHandler = () => {
        dispatch(setMyPacksAC(false))
    }
  const myOnClickHandler = () => {
    if (!isLoading) dispatch(setMyPacksAC(true))

  }
  const allOnClickHandler = () => {
    if (!isLoading) dispatch(setMyPacksAC(false))
  }

  return (
    <div className={s.label}>
      <div onClick={myOnClickHandler} className={myPacks ? s.selected : s.tab}>
        <h5>My</h5>
      </div>
      <div onClick={allOnClickHandler} className={!myPacks ? s.selected : s.tab}>
        <h5>All</h5>
      </div>
    </div>
  )
}