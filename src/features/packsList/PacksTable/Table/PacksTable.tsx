import React from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {PackType} from "../../../../API/cardsPackApi";

const PacksTable = () => {

    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div>Name</div>
                <div>Cards</div>
                <div>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </div>
            {packs.map(pack => <Pack key={pack._id} pack={pack}/>)}
        </div>


    );
};

export default PacksTable;