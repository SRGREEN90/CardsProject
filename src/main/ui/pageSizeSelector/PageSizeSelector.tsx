import React, {ChangeEvent, useState} from 'react';
import SuperSelect from "../common/SuperSelect/SuperSelect";

type PropsType = {
  pageCount: number
  handler: (value:number)=> void
}
export const PageSizeSelector:React.FC<PropsType> = ({pageCount, handler}) => {

  const arr:number[] = [8, 10, 20, 50]

  const [value, setValue] = useState(pageCount)

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = +e.currentTarget.value
    setValue(value)
    handler(value)
  }

  return (
    <div>
      Show
      <SuperSelect
        options={arr}
        value={value}
        onChange={onChangeHandler}
      />
      Cards per Page
    </div>
  );
};
