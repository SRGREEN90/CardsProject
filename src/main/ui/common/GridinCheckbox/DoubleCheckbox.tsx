import React, {useState} from "react";
import s from './DoubleCheckbox.module.css'


function DoubleCheckbox() {

    const [select, setSelect] = useState<boolean>(true);

    const myOnClickHandler = () => {
        setSelect(true)
    }
    const allOnClickHandler = () => {
        setSelect(false)
    }

    return <div className={s.label}>
        <div onClick={myOnClickHandler} className={select ? s.selected : s.tab}>
           <h5>My</h5>
        </div>
        <div onClick={allOnClickHandler}  className={!select ? s.selected : s.tab}>
            <h5>All</h5>
        </div>
    </div>
}

export default DoubleCheckbox