import React from 'react';
import SuperButton from "../main/ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../main/ui/common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../main/ui/common/SuperInputText/SuperInputText";
import s from './test.module.css';

export const Test = () => {
    return (
        <div className={s.container}>
            <SuperButton>BUTTON</SuperButton>
            <SuperCheckbox/>
            <SuperInputText/>
        </div>
    );
};
