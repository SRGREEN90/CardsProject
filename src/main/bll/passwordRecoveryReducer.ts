import {Dispatch} from "redux";
import {AppThunkType} from "./store";

const initialState = {}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
};

// type
type InitialStateType = {}

export type AuthActionsType = actionsACType

// actions
export const actionsAC = (value: any) => ({type: 'ANY', value} as const)

type actionsACType = ReturnType<typeof actionsAC>

// thunk
export const passwordRecoveryTC = (): AppThunkType => {
    return (dispatch: Dispatch) => {
    }
};
