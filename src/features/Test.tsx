import React, {useState} from 'react';
import SuperButton from "../main/ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../main/ui/common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../main/ui/common/SuperInputText/SuperInputText";
import s from './test.module.css';
import SuperEditableSpan from "../main/ui/common/SuperEditableSpan/SuperEditableSpan";
import {RangeDemo} from "../main/ui/common/SuperRange/RangeDemo";
import {DoubleCheckbox} from "../main/ui/common/GridinCheckbox/DoubleCheckbox";
import {Search} from "../main/ui/common/GridinSearch/Search";
import {Pagination} from "../main/ui/common/Pagination/Pagination";

export const Test = () => {
  const [value, setValue] = useState<string>('')
  const [page, setPage] = useState(1)
  const onChangedPage = (page: number) => {
    setPage(page)
  }
  return (
    <div className={s.container}>
      <div>
        <Pagination totalCount={2211} pageSize={10} currentPage={page} onChangedPage={onChangedPage}/>
      </div>
      <SuperButton>BUTTON</SuperButton>
      <SuperCheckbox/>
      <SuperInputText/>
      <div>
        <SuperEditableSpan
          value={value}
          onChangeText={setValue}
          spanProps={{children: value ? undefined : 'enter text...'}}
        />

        <h3>Double Check</h3>
        <div>
          <DoubleCheckbox/>
        </div>

        <h3>Search</h3>
        <div>
          <Search/>
        </div>

      </div>
      <RangeDemo/>

    </div>
  );
};
