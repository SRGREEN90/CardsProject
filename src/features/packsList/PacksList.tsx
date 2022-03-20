import React, {useEffect, useState} from 'react';
import styles from './PacksList.module.css'
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import PacksTable from "./PacksTable/Table/PacksTable";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import Sidebar from "../../main/ui/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {addPackTC, changeCurrentPageAC, fetchPacksListsTC, setPageCountAC} from "../../main/bll/cardsPackReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {Pagination} from "../../main/ui/common/Pagination/Pagination";
import {PageSizeSelector} from "../../main/ui/pageSizeSelector/PageSizeSelector";
import {PacksSearch} from "../../main/ui/common/GridinSearch/PacksSearch";
import Modal from "../../main/ui/common/Modal/Modal";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";

const PacksList = () => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string>(state => state.app.error);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
    //const min = useSelector<AppRootStateType, number>(state => state.cardsPack.min)
    //const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
    const page = useSelector<AppRootStateType, number>(state => state.cardsPack.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cardsPack.pageCount)
    const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.cardsPack.cardPacksTotalCount)
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)
    //const [id, setId] = useState(0)

    const [newPackName, setNewPackName] = useState<string>('');
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
    const showModalAdd = () => setIsModalAdd(true);
    const closeModalAdd = () => setIsModalAdd(false);

    useEffect(() => {
        dispatch(fetchPacksListsTC())
    }, [page, pageCount, myPacks, sortPacks, packName])

    // useEffect(() => {
    //   console.log('uEf2')
    //   clearTimeout(id)
    //   const x = +setTimeout(()=> {
    //     dispatch(fetchPacksListsTC())
    //   }, 1500)
    //   setId(x)
    // }, [ min, max])
    const pageSizeHandler = (value: number) => {
        dispatch(setPageCountAC(value))
    }
    const onChangedPage = (newPage: number) => {
        if (newPage !== page) dispatch(changeCurrentPageAC(newPage))
    }
    const addPack = () => {
        dispatch(addPackTC(newPackName))
        setNewPackName('')
        closeModalAdd()
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Header/>
            <PackFrame>
                <Sidebar/>
                <div className={styles.main}>
                    <h2>Packs list</h2>
                    <div className={styles.search}>
                        <PacksSearch/>
                    </div>
                    {error ? <div style={{color: 'red'}}>{error}</div> : ''}
                    <SuperButton onClick={showModalAdd}>Add new pack</SuperButton>
                    <PacksTable/>
                    <div className={styles.paginationWrapper}>
                        {
                            cardPacksTotalCount < pageCount
                                ? <></>
                                : <Pagination totalCount={cardPacksTotalCount}
                                              pageSize={pageCount}
                                              currentPage={page}
                                              onChangedPage={onChangedPage}/>
                        }
                        <PageSizeSelector pageCount={pageCount}
                                          handler={pageSizeHandler}/>
                    </div>
                </div>
            </PackFrame>
            <Modal title={'Add new pack'} show={isModalAdd} closeModal={closeModalAdd}>
                <label>Name pack</label>
                <SuperInputText value={newPackName} onChangeText={setNewPackName}/>
                <SuperButton onClick={closeModalAdd}>Cancel</SuperButton>
                <SuperButton onClick={addPack}>Save</SuperButton>
            </Modal>
        </>
    );
};

export default PacksList;