// КАРТОЧКИ
import {cardsApi, CardsGradeResponseType, CardType, GetCardsGrade, GetCardsParamsType} from "../../API/cardsApi";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {setErrorAC, setLoadingAC} from "./appReducer";

const initialState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 8,
    searchCard: '',
    sortCards: '0updated',
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardAnswer: "",
    cardQuestion: '',
    grade: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARD':
            return {...state, ...action.data};
        case "CARDS/CLEAR_CARDS":
            return initialState
        case "CARDS/CHANGE_CURRENT_PAGE":
            return {...state, page: action.page}
        case 'CARDS/SORT_CARDS':
            return {...state, sortCards: action.sortCards}
        case 'CARDS/SET_FILTER_CARDS':
            return {...state, cardQuestion: action.cardQuestion}
        case 'CARDS/SET_PAGE_COUNT_CARDS':
            return {...state, pageCount: action.pageCount}
        case 'CARDS/SET_CARDS_GRADE':
            return {...state, grade: action.grade}
        default:
            return state
    }
};

// type
type InitialStateType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    searchCard: string
    sortCards: string
    packUserId: string
    token: string
    tokenDeathTime: number
    cardAnswer: string
    cardQuestion: string
    grade: number
}

export type CardsActionsType = cardsReducerACType | ChangeCurrentPageCardsACType
  | SortCardsACACType | setFilterReducerACType | SetPageCountCardsACType
| ClearCardsACType | SetCardsGradeACType

export const cardsReducerAC = (data: InitialStateType) => {
    return {type: 'CARDS/SET_CARD', data} as const;
};
export const clearCardsAC = () => {
    return {type: 'CARDS/CLEAR_CARDS'} as const;
};
type ClearCardsACType = ReturnType<typeof clearCardsAC>

export const setFilterReducerAC = (cardQuestion: string) => {
    return {type: 'CARDS/SET_FILTER_CARDS', cardQuestion} as const;
};

type cardsReducerACType = ReturnType<typeof cardsReducerAC>
type setFilterReducerACType = ReturnType<typeof setFilterReducerAC>

export const changeCurrentPageCardsAC = (page: number) =>
    ({type: 'CARDS/CHANGE_CURRENT_PAGE', page} as const)
type ChangeCurrentPageCardsACType = ReturnType<typeof changeCurrentPageCardsAC>

export const sortCardsAC = (sortCards: string) =>
    ({type: 'CARDS/SORT_CARDS', sortCards} as const)
type SortCardsACACType = ReturnType<typeof sortCardsAC>

export const setPageCountCardsAC = (pageCount:number) =>
    ({type: 'CARDS/SET_PAGE_COUNT_CARDS', pageCount} as const)
type SetPageCountCardsACType = ReturnType<typeof setPageCountCardsAC>

export const setCardsGradeAC = (grade: number) =>
    ({type: 'CARDS/SET_CARDS_GRADE', grade} as const)
type SetCardsGradeACType = ReturnType<typeof setCardsGradeAC>


export const fetchCardsTC = (packUserId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingAC(true))
        const {sortCards, cardAnswer, cardQuestion, page, pageCount} = getState().cards
        const data: GetCardsParamsType = {
            cardAnswer: cardAnswer,
            cardQuestion: cardQuestion,
            cardsPack_id: packUserId,
            min: 0,
            max: 0,
            sortCards: sortCards,
            page: page,
            pageCount: pageCount,
        }
        cardsApi.getCards(data)
            .then((res) => {
                dispatch(cardsReducerAC(res.data));
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    };

export const learnCardsTC = (packUserId: string) =>
  (dispatch: Dispatch) => {
      dispatch(setLoadingAC(true))
      const data: GetCardsParamsType = {
          cardAnswer: "",
          cardQuestion: "",
          cardsPack_id: packUserId,
          min: 0,
          max: 0,
          sortCards: "0question",
          page: 1,
          pageCount: 1000,
      }
      cardsApi.getCards(data)
        .then((res) => {
            dispatch(cardsReducerAC(res.data));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => {
            dispatch(setLoadingAC(false));
        })
  };




export const CardsGradeTC = (cardId: string, grade: number) =>
    (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true))
        const data: GetCardsGrade = {
            grade: grade,
            card_id: cardId
        }
        cardsApi.updateCardsGrade(data)
            .then((res) => {
                dispatch(setCardsGradeAC(res.data.grade));
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    };