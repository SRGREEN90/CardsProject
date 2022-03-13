import React, {useState} from 'react';
import styles from "./Sidebar.module.css";
import {DoubleCheckbox} from "../common/GridinCheckbox/DoubleCheckbox";
import {RangeDemo} from "../common/SuperRange/RangeDemo";

const Sidebar = () => {

    return (
        <div className={styles.sidebar}>
            Show packs cards
            <DoubleCheckbox/>
            <RangeDemo/>
        </div>
    );
};

export default Sidebar;