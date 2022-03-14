import React, {useEffect, useState} from 'react';
import styles from "./Sidebar.module.css";
import {DoubleCheckbox} from "../common/GridinCheckbox/DoubleCheckbox";
import stl from "../common/SuperRange/RangeDemo.module.css";
import SuperDoubleRange from "../common/SuperRange/common/c8-SuperDoubleRange/SuperDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {setMaxAC, setMinAC} from "../../bll/cardsPackReducer";

const Sidebar = () => {
  const dispatch = useDispatch()
  const maxCardsCount = useSelector<AppRootStateType, number>(state => state.cardsPack.maxCardsCount)
  const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
  const min = useSelector<AppRootStateType, number>(state => state.cardsPack.min)

  useEffect(()=>{
    dispatch(setMaxAC(maxCardsCount))
  }, [maxCardsCount])

  const onChangeDoubleRanger = (value: [number, number]) => {
    if (value[0] !== min) dispatch(setMinAC(value[0]))
    if (value[1] !== max) dispatch(setMaxAC(value[1]))
  }

  return (
    <div className={styles.sidebar}>
      Show packs cards
      <DoubleCheckbox/>

      <div className={stl.container}>
        <span>{min}</span>
        <SuperDoubleRange
          value={[min, max]}
          max={maxCardsCount}
          onChangeRange={onChangeDoubleRanger}
        />
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Sidebar;