import React from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";

export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

const PacksTable = () => {
    const cardsExample: Array<PackType> = [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d4",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d5",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d6",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d5",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d6",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },{
            _id: "5eb6cef840b7bf1cf0d8122d5",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        }, {
            _id: "5eb6cef840b7bf1cf0d8122d6",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
    ]

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div>Name</div>
                <div>Cards</div>
                <div>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </div>
            {cardsExample.map(pack => <Pack key={pack._id} pack={pack}/>)}
        </div>


    );
};

export default PacksTable;