import React from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {PackType} from "../../../../API/cardsPackApi";
import {sortPacksAC} from "../../../../main/bll/cardsPackReducer";

const PacksTable = () => {
    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)

    const sortUpdate = () => dispatch(sortPacksAC('0updated'))
    const sortName = () => dispatch(sortPacksAC('1name'))

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div onClick={sortName}>Name</div>
                <div>Cards</div>
                <div onClick={sortUpdate}>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </div>
            {packs.length > 0
                ? packs.map(pack => <Pack key={pack._id} pack={pack}/>)
                : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>}
        </div>


    );
};

export default PacksTable;