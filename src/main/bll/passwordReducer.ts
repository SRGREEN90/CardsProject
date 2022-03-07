import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {authAPI} from "../../API/api";

const initialState = {
    password: '',
    resetPasswordToken: '',

    email: ''
}

export const passwordReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_PASSWORD":
            return {
                ...state,
                password: action.payload.newPassword,
                resetPasswordToken: action.payload.resetPasswordToken,
            }
        case "SEND_EMAIL":
            return {
                ...state,
                email: action.payload.email
            }


        default:
            return state
    }
};

// type
type InitialStateType = typeof initialState

export type AuthActionsType = passwordRecoveryACType | passwordForgotACType

// actions

export const passwordForgotAC = (email: string) =>
    ({
        type: 'SEND_EMAIL',
        payload: {
            email
        }
    } as const)



export const passwordRecoveryAC = (newPassword: any, resetPasswordToken: any) =>
    ({
        type: 'SET_NEW_PASSWORD',
        payload: {
            newPassword,
            resetPasswordToken
        }
    } as const)



type passwordRecoveryACType = ReturnType<typeof passwordRecoveryAC>
type passwordForgotACType = ReturnType<typeof passwordForgotAC>


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
                }
            })
    }
};

export const passwordForgotTC = (email: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        authAPI.sendMail(email)
            .then(res => {
                console.log(res)
                if (res.data === 200) {
                    let newEmail = res.data.email
                    dispatch(passwordForgotAC(newEmail))
                }
            })

    }
};
