// КОЛОДЫ
import {cardsPackApi, PacksResponseType, PackType} from "../../API/cardsPackApi";
import {setErrorAC, setLoadingAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 8,
    myPacks: false,
    sortPacks: "0updated",
    min: 0,
    max: 0,
    packName: '',
    user_id: '',
}

export const cardsPackReducer = (state: InitialStateType = initialState, action: CardsPackActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS_LIST':
            return {...state, ...action.data}
        case 'PACKS/SORT':
            return {...state, sortPacks: action.sortPacks}
        case 'PACKS/SET_MY_PACKS':
            return {...state, myPacks: action.myPacks, min: 0}
        case "PACKS/CHANGE_CURRENT_PAGE":
            return {...state, page: action.page}
        case "PACKS/SET_MIN":
            return {...state, min: action.min}
        case "PACKS/SET_MAX":
            return {...state, max: action.max}
        default:
            return state
    }
};

// type
type InitialStateType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    myPacks: boolean
    sortPacks: string
    min: number
    max: number
    packName: string
    user_id: string
}

export type CardsPackActionsType = SetPacksListsACType | SortPacksACType | SetMyPacksACType
    | ChangeCurrentPageACType | SetMinACType | SetMaxACType
// Action creators
export const setPacksListsAC = (data: PacksResponseType) =>
    ({type: 'PACKS/SET_PACKS_LIST', data} as const)

type SetPacksListsACType = ReturnType<typeof setPacksListsAC>

export const sortPacksAC = (sortPacks: string) =>
    ({type: 'PACKS/SORT', sortPacks} as const)

type SortPacksACType = ReturnType<typeof sortPacksAC>

export const setMyPacksAC = (myPacks: boolean) =>
    ({type: 'PACKS/SET_MY_PACKS', myPacks} as const)

type SetMyPacksACType = ReturnType<typeof setMyPacksAC>

export const changeCurrentPageAC = (page: number) =>
    ({type: 'PACKS/CHANGE_CURRENT_PAGE', page} as const)
type ChangeCurrentPageACType = ReturnType<typeof changeCurrentPageAC>

export const setMinAC = (min: number) =>
    ({type: 'PACKS/SET_MIN', min} as const)
type SetMinACType = ReturnType<typeof setMinAC>

export const setMaxAC = (max: number) =>
    ({type: 'PACKS/SET_MAX', max} as const)
type SetMaxACType = ReturnType<typeof setMaxAC>

// Thunk creators
export const fetchPacksListsTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingAC(true))

        let {packName, min, max, sortPacks, page, pageCount, myPacks, user_id} = getState().cardsPack;
        let myUserId = getState().profilePage._id;

        user_id = myPacks ? myUserId : user_id

        const payload = {packName, min, max, sortPacks, page, pageCount, user_id};

        cardsPackApi.getPacks(payload)
            .then((res) => {
                dispatch(setPacksListsAC(res.data))
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    }
}