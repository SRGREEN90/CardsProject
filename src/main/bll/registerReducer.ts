import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {registrationAPI} from "../../API/api-registration";

const initialState = {
  isRegistered: false
}

export const registerReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case "SET-REGISTER":
      return {...state, isRegistered: action.isRegistered}
    default:
      return state
  }
};

// type
type InitialStateType = {
  isRegistered: boolean
}

export type AuthActionsType = setRegisterType

// actions
export const setRegister = (isRegistered: boolean) =>
  ({type: 'SET-REGISTER', isRegistered} as const)

type setRegisterType = ReturnType<typeof setRegister>

// thunk
export const registerTC = (email: string, password: string): AppThunkType => {
  return (dispatch: Dispatch) => {
    registrationAPI.register(email, password)
      .then(res => {
        dispatch(setRegister(true))
      })
  }
};