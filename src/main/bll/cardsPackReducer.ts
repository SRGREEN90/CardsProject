// КОЛОДЫ
import {cardsPackApi, PacksResponseType, PackType} from "../../API/cardsPackApi";
import {setErrorAC, setLoadingAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 100,
    page: 1,
    pageCount: 8,
    minCardsRange: 0,
    maxCardsRange: 10,
    myPacks: false,
    sortPacks: "1updated",
    min: 0,
    max: 100,
    packName: '',
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
        let {packName, min, max, sortPacks, page, pageCount} = getState().cardsPack;
        const payload = {packName, min, max, sortPacks, page, pageCount,};
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