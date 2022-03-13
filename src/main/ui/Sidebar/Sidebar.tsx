import React from 'react';
import styles from "./Sidebar.module.css";
import {DoubleCheckbox} from "../common/GridinCheckbox/DoubleCheckbox";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            Show packs cards
            <DoubleCheckbox/>
            Двойной ползунок
        </div>
    );
};

export default Sidebar;