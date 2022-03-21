import React from 'react';
import styles from "./Modal.module.css";

type PropsType = {
    children: React.ReactNode
}

const ModalButtonsWrap = (props: PropsType) => {
    return (
        <div className={styles.modalButtons}>
            {props.children}
        </div>
    );
};

export default ModalButtonsWrap;