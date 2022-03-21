import React, {useState} from 'react';
import styles from "./PacksTable.module.css";
import {NavLink, useParams} from "react-router-dom";
import {PackType} from "../../../../API/cardsPackApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {deletePackTC} from "../../../../main/bll/cardsPackReducer";
import {SuperLoading} from "../../../../main/ui/common/Loading/loading";


type PackPropsType = {
    pack: PackType
}

const Pack: React.FC<PackPropsType> = ({pack}) => {
    const dispatch = useDispatch();
    const myUserId = useSelector<AppRootStateType, string>(state => state.profilePage._id)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const deletePack = (packId: string) => dispatch(deletePackTC(packId))


    if (isLoading) {
        return <SuperLoading/>
    }

    return (
        <div className={`${styles.pack} ${styles.item}`}>
            <NavLink to={`/cards/${pack._id}`}>
                {pack.name}
            </NavLink>
            <div>{pack.cardsCount}</div>
            <div>{pack.updated.slice(0, 10)}</div>
            <div>{pack.user_name}</div>
            <div className={styles.buttons}>
                {
                    myUserId === pack.user_id && <>
                        <button className={`${styles.button} ${styles.delete}`}
                                onClick={() => deletePack(pack._id)}>Delete
                        </button>
                        <button className={styles.button}>Edit</button>
                    </>
                }
                <NavLink to={`/learn/${pack._id}`} className={`${!pack.cardsCount ? styles.disabled : ''} ${styles.button}`}>Learn</NavLink>
            </div>
        </div>
    );
};

export default Pack;