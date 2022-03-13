// КОЛОДЫ
import {PackType} from "../../API/cardsPackApi";

const initialState = {
    cardPacks: [],
    page: 1,
    pageCount: 20,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 10,
    searchPack: "",
    minCardsRange: 0,
    maxCardsRange: 10,
    myPacks: false,
}

export const cardsPackReducer = (state: InitialStateType = initialState, action: CardsPackActionsType): InitialStateType => {
    switch (action.type) {
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
}

export type CardsPackActionsType = any