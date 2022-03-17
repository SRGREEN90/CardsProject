import React from "react";
import styles from './Pagination.module.css';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onChangedPage: (n: number) => void
}
export const Pagination = ({totalCount, pageSize, currentPage, onChangedPage}: PropsType) => {
    //const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    const pageCounts = totalCount ? Math.ceil(totalCount / pageSize) : 1;
    const pages = [];
    const step = pageCounts > 200 ? 50 : 10;
    const isStep = pageCounts > 4;

    let pageLimit = 4;
    let startPage = currentPage - pageLimit / 2;
    let endPage = currentPage + pageLimit / 2;

    if (startPage < 1) {
        startPage = 1;
        endPage = pageLimit + 1;
    }
    if (endPage > pageCounts) {
        endPage = pageCounts;
        startPage = pageCounts - pageLimit < 1 ? 1 : pageCounts - pageLimit;
    }
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const pageList = pages.map(n => {
        const onClickGetByPage = () => onChangedPage(n);
        //const onClickGetByPage = () => !isLoading && onChangedPage(n);

        return (
            <span key={n}
                  className={currentPage === n ? styles.currentPage : styles.page}
                  onClick={onClickGetByPage}>
                {n}
            </span>
        );
    })

    //Functions Buttons
    const firstPageHandler = () => onChangedPage(1);
    const lastPageHandler = () => onChangedPage(pageCounts);
    const upPageHandler = () => {
        (currentPage + step) > pageCounts
            ? onChangedPage(pageCounts)
            : onChangedPage(currentPage + step)
    };
    const downPageHandler = () => {
        (currentPage - step) < 0
            ? onChangedPage(1)
            : onChangedPage(currentPage - step)
    };

    const previous = () => {
        onChangedPage(currentPage - 1)
    }

    const next = () => {
        onChangedPage(currentPage + 1)
    }

    //COMPLETE JSX
    return (
        <div className={styles.pagesWrapper}>
            {currentPage > 1 ? <span className={styles.page} onClick={previous}>{'<'}</span> : <></>}
            {currentPage > 4 ? <span className={styles.page} onClick={firstPageHandler}>1</span> : <></>}
            {/*{isStep && <span className={styles.page} onClick={downPageHandler}>{'...'}</span>}*/}
            {currentPage > 3 ? <span className={styles.page} onClick={downPageHandler}>{'...'}</span> : <></>}
            <div className={styles.pageList}>
                {pageList}
            </div>
            {currentPage < pageCounts - 3 ?
                <span className={styles.page} onClick={upPageHandler}>{'...'}</span> : <></>}
            {/*{isStep && <span className={styles.page} onClick={upPageHandler}>{'...'}</span>}*/}
            {endPage === pageCounts ? <></> :
                <span className={styles.page} onClick={lastPageHandler}>{pageCounts}</span>}
            {(currentPage !== pageCounts) ? <span className={styles.page} onClick={next}>{'>'}</span> : <></>}
        </div>
    );
}
//
// import React from "react";
// import stl from './Pagination.module.css';
//
// type PropsType = {
//     totalCount: number
//     pageSize: number
//     currentPage: number
//     onChangedPage: (n: number) => void
// }
// export const Pagination = ({totalCount, pageSize, currentPage, onChangedPage}: PropsType) => {
//     //const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
//     const pageCounts = totalCount ? Math.ceil(totalCount / pageSize) : 1;
//     const pages = [];
//     const step = pageCounts > 200 ? 50 : 10;
//     const isStep = pageCounts > 10;
//
//     let pageLimit = 6;
//     let startPage = currentPage - pageLimit / 2;
//     let endPage = currentPage + pageLimit / 2;
//
//     if (startPage < 1) {
//         startPage = 1;
//         endPage = pageLimit + 1;
//     }
//     if (endPage > pageCounts) {
//         endPage = pageCounts;
//         startPage = pageCounts - pageLimit < 1 ? 1 : pageCounts - pageLimit;
//     }
//     for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//     }
//
//     const pageList = pages.map(n => {
//         const onClickGetByPage = () => onChangedPage(n);
//         //const onClickGetByPage = () => !isLoading && onChangedPage(n);
//
//         return (
//             <span key={n}
//                   className={currentPage === n ? stl.currentPage : stl.page}
//                   onClick={onClickGetByPage}>
//                 {n}
//             </span>
//         );
//     })
//
//     //Functions Buttons
//     const firstPageHandler = () => onChangedPage(1);
//     const lastPageHandler = () => onChangedPage(pageCounts);
//     const upPageHandler = () => {
//         (currentPage + step) > pageCounts
//             ? onChangedPage(pageCounts)
//             : onChangedPage(currentPage + step)
//     };
//     const downPageHandler = () => {
//         (currentPage - step) < 0
//             ? onChangedPage(1)
//             : onChangedPage(currentPage - step)
//     };
//
//     //COMPLETE JSX
//     return (
//         <div className={stl.pagesWrapper}>
//             <span className={stl.page} onClick={firstPageHandler}>{'<<'}</span>
//             {isStep && <span className={stl.page} onClick={downPageHandler}>{'--'}</span>}
//             <div className={stl.pageList}>
//                 {pageList}
//             </div>
//             {isStep && <span className={stl.page} onClick={upPageHandler}>{'++'}</span>}
//             <span className={stl.page} onClick={lastPageHandler}>{'>>'}</span>
//         </div>
//     );
// }