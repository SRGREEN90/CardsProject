import React, {MouseEvent, useState} from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {PackType} from "../../../../API/cardsPackApi";
import {sortPacksAC} from "../../../../main/bll/cardsPackReducer";

const PacksTable = () => {
    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)

    // const [isActive, setIsActive] = useState<boolean>(false)

    const sortFields = (field: string) => {

        if (sortPacks.slice(1) !== field) {
            dispatch(sortPacksAC('0' + field))
        } else {
            if (sortPacks[0] !== '0') {
                dispatch(sortPacksAC('0' + field))
            } else {
                dispatch(sortPacksAC('1' + field))
            }
        }
    }

    const sortUpdate = () => sortFields('updated')
    const sortName = () => sortFields('name')
    const sortCards = () => sortFields('cardsCount')
    const sortUserName = () => sortFields('user_name')

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div onClick={sortName} >Name</div>
                <div onClick={sortCards}>Cards</div>
                <div onClick={sortUpdate} className={styles.active}>Last Updated</div>
                <div onClick={sortUserName}>Created by</div>
                <div>Actions</div>
            </div>
            {packs.length > 0
                ? packs.map(pack => <Pack key={pack._id} pack={pack}/>)
                : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>}
        </div>


    );
};

export default PacksTable;