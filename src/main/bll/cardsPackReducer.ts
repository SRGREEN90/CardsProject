// КОЛОДЫ
import {cardsPackApi, PacksResponseType, PackType} from "../../API/cardsPackApi";
import {setErrorAC, setLoadingAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    page: 1,
    pageCount: 10,
    minCardsCount: 10,
    maxCardsCount: 100,
    minCardsRange: 0,
    maxCardsRange: 10,
    myPacks: false,
    searchPack: "",
    sortPacks: "",
    min: 0,
    max: 100,
    packName: ''
}

export const cardsPackReducer = (state: InitialStateType = initialState, action: CardsPackActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS_LIST':
            return {...state, ...action.data}
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
    searchPack: string
    minCardsRange: number
    maxCardsRange: number
    myPacks: boolean
    sortPacks: string
    min: number
    max: number
    packName: string
}

export type CardsPackActionsType = setPacksListsAC

export const setPacksListsAC = (data: PacksResponseType) =>
    ({type: 'PACKS/SET_PACKS_LIST', data} as const)

type setPacksListsAC = ReturnType<typeof setPacksListsAC>

export const fetchPacksListsTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingAC(true))
        let state = getState().cardsPack;
        const payload = {
            packName: state.packName,
            min: state.min,
            max: state.max,
            sortPacks: state.sortPacks,
            page: state.page,
            pageCount: state.pageCount,
        };
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