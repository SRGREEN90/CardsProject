// КАРТОЧКИ
import {cardsApi, CardType, GetCardsParamsType} from "../../API/cardsApi";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";

const initialState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 8,
    searchCard: '',
    sortCards: '',
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardAnswer: "",
    cardQuestion: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARD':
            return {...state, ...action.data};
        case "CARDS/CHANGE_CURRENT_PAGE":
            return {...state, page: action.page}
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
}

export type CardsActionsType = cardsReducerACType | ChangeCurrentPageCardsACType

export const cardsReducerAC = (data: InitialStateType) => {
    return {type: 'CARDS/SET_CARD', data} as const;
};

type cardsReducerACType = ReturnType<typeof cardsReducerAC>

export const changeCurrentPageCardsAC = (page: number) =>
    ({type: 'CARDS/CHANGE_CURRENT_PAGE', page} as const)
type ChangeCurrentPageCardsACType = ReturnType<typeof changeCurrentPageCardsAC>

export const fetchCardsTC = (packUserId: string ) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState().cards
    const {sortCards, cardAnswer, cardQuestion, page, pageCount} = state
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
            // console.log(res.data)
            dispatch(cardsReducerAC(res.data));
        })
        .catch((err) => {
            console.log(err)
        });
};