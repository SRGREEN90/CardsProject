import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {loginApi} from "../../API/loginAPI";

export type StateLoginType = {
    statusLoading: boolean
    loading: boolean
    error: string
}

export const initialStateLogin: StateLoginType = {
    statusLoading: false,
    loading: false,
    error: '',
};

export const loginReducer = (state: StateLoginType = initialStateLogin, action: AuthActionsType): StateLoginType => {
    switch (action.type) {
        case "login/SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
            }
        case "login/SET_LOADING":
            return {
                ...state,
                loading: action.payload.loading,
            }
        case "login/SET_SUCCESS":
            return {
                ...state,
                statusLoading: action.payload.statusLoading,
            }
        default: {
            return state
        }
    }
};

// types
export type AuthActionsType = setLoadingType | setSuccessType | setErrorType
type setLoadingType = ReturnType<typeof setLoadingAC>
type setSuccessType = ReturnType<typeof setSuccessAC>
type setErrorType = ReturnType<typeof setErrorAC>

// actions
export const setLoadingAC = (loading: boolean) => {
    return {
        type: 'login/SET_LOADING',
        payload: {
            loading: loading,
        },
    } as const
};

export const setSuccessAC = (statusLoading: boolean) => {
    return {
        type: 'login/SET_SUCCESS',
        payload: {
            statusLoading: statusLoading,
        },
    } as const
};

export const setErrorAC = (error: string) => {
    return {
        type: 'login/SET_ERROR',
        payload: {
            error: error,
        },
    } as const
};

// thunks
export const loginTC = (email: string, password: string, remember: boolean): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        loginApi.login(email, password, remember)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res) // здесь должен быть экшн для передачи данный  из респонса при переходе на профайл
                    dispatch(setSuccessAC(true))
                }
            })
            .catch(e => {
            dispatch(setErrorAC(e.response ? e.response.data.error : e.message))
        })
            .finally(() => {
            dispatch(setLoadingAC(false));
        })
    }
};