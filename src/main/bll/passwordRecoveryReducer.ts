import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {authAPI} from "../../API/api";

const initialState = {
    password: '',
    resetPasswordToken: ''
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_PASSWORD":
            return {
                ...state,
                password: action.payload.newPassword,
                resetPasswordToken: action.payload.resetPasswordToken,
            }


        default:
            return state
    }
};

// type
type InitialStateType = typeof initialState

export type AuthActionsType = passwordRecoveryACType

// actions
export const passwordRecoveryAC = (newPassword: any, resetPasswordToken: any) =>
    ({
        type: 'SET_NEW_PASSWORD',
        payload: {
            newPassword,
            resetPasswordToken
        }
    } as const)

type passwordRecoveryACType = ReturnType<typeof passwordRecoveryAC>


// thunk
export const passwordRecoveryTC = (password: string, resetPasswordToken: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        authAPI.recoveryPassword(password, resetPasswordToken)
            .then(data => {
                if (data.status === 200) {
                    const newPassword = data.data.newPassword
                    const newToken = data.data.token
                     const action = passwordRecoveryAC(newPassword, newToken)
                    dispatch(action)
                    // dispatch(setAppStatusAC('succeeded'))
                } else {

                }
            })
            // .catch((error) => {
            //     handleServerNetworkError(error, dispatch)
            // })
    }
};
