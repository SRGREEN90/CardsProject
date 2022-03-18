import React from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {PackType} from "../../../../API/cardsPackApi";
import {sortPacksAC} from "../../../../main/bll/cardsPackReducer";
import Preloader from "../../../../main/ui/common/Preloader/Preloader";

const PacksTable = () => {
  const dispatch = useDispatch();
  const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)
  const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
  const isLoading =useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  const direction = sortPacks[0]
  const activeField = sortPacks.slice(1)
  const rotate = direction === "1" ? styles.up : ""

  // const [isActive, setIsActive] = useState<boolean>(false)

  const sortFields = (field: string) => {
    if (isLoading) return
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

  if (isLoading) {
    return <Preloader/>
  }

  return (
    <div className={styles.table}>
      <div className={`${styles.header} ${styles.item}`}>
        <div onClick={sortName} className={activeField === "name" ? `${styles.active} ${rotate}` : ""} >Name</div>
        <div onClick={sortCards} className={activeField === "cardsCount" ? `${styles.active} ${rotate}` : ""}>Cards</div>
        <div onClick={sortUpdate} className={activeField === "updated" ? `${styles.active} ${rotate}` : ""}>Last Updated</div>
        <div onClick={sortUserName} className={activeField === "user_name" ? `${styles.active} ${rotate}` : ""}>Created by</div>
        <div>Actions</div>
      </div>
      {packs.length > 0
        ? packs.map(pack => <Pack key={pack._id} pack={pack}/>)
        : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>}
    </div>


  );
};

export default PacksTable;