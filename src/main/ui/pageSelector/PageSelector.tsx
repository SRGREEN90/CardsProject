import React, {ChangeEvent, useState} from 'react';
import SuperSelect from "../common/SuperSelect/SuperSelect";
import {useDispatch} from "react-redux";
import {setPageCountAC} from "../../bll/cardsPackReducer";
type PropsType = {
  pageCount: number
}
export const PageSelector:React.FC<PropsType> = ({pageCount}) => {
  const dispatch = useDispatch()

  const arr:number[] = [8, 10, 20, 50]
  const [value, setValue] = useState(pageCount)
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = +e.currentTarget.value
    setValue(value)
    dispatch(setPageCountAC(value))
  }
  return (
    <div>
      Show
      <SuperSelect style={{width: "20px"}}
        options={arr}
        value={value}
        onChange={onChangeHandler}
      />
      Cards per Page
    </div>
  );
};
