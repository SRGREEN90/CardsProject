import React from 'react';
import styles from "./PacksTable.module.css";
import {NavLink} from "react-router-dom";
import {PackType} from "./PacksTable";

type PackPropsType = {
    pack: PackType
}

const Pack: React.FC<PackPropsType> = ({pack}) => {
    return (
        <div className={`${styles.pack} ${styles.item}`}>
            {/*<NavLink to={`/cards/${pack._id}`}>*/}
            {/*    {pack.name}*/}
            {/*</NavLink>   */}
            <NavLink to={`/cards/`}>
                {pack.name}
            </NavLink>
            <div>{pack.cardsCount}</div>
            <div>{pack.updated.slice(0, 10)}</div>
            <div>{pack.user_id}</div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                <button className={styles.button}>Edit</button>
                <NavLink to={`/pack-learn/${pack._id}`} className={styles.button}>Learn</NavLink>
            </div>
        </div>
    );
};

export default Pack;