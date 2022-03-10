import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {cardsAPI} from "../../API/api";

const initialState = {
  isInitialized: false,
  error: '',
  isLoggedIn: false
}

export const appReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
};

// type
type InitialStateType = {
  isInitialized: boolean
  error: string
  isLoggedIn: boolean
}

export type AuthActionsType = setIsInitializedType | setErrorType | setIsLoggedInACType

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'APP/SET-IS-LOGGED-IN', value} as const)
// actions
export const setIsInitializedAC  = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED',isInitialized} as const)

type setIsInitializedType = ReturnType<typeof setIsInitializedAC>

export const setErrorAC = (error: string) =>
  ({type: 'APP/SET-ERROR', error} as const)

type setErrorType = ReturnType<typeof setErrorAC>

// thunk
export const initializeAppTC = (): AppThunkType => {
  return (dispatch: Dispatch) => {
    cardsAPI.me()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLoggedInAC(true));
        }
      })
      .catch(e => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
      })
      .finally(() => {
        dispatch(setIsInitializedAC(true));
      })
  }
};