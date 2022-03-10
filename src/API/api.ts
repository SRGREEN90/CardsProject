import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const cardsAPI = {
    me() {
        return instance.post<UserResponseType>('/auth/me')
    },
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>('/auth/register', {email, password})
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<UserResponseType>('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<LogoutResponseType>('/auth/me')
    },
    sendMail(email: string) {
        return instance.post(`auth/forgot`, {
            email: email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: <a href='http://localhost:3002/#/set-new-password/$token$'>link</a>
            </div>`
        })
    },
    newPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post<any>('/auth/set-new-password', {password, resetPasswordToken})
    },
    updateProfile(data: updateProfileRequestType) {
        return instance.put<updateProfileRequestType, AxiosResponse<updateProfileResponseType, updateProfileRequestType>, updateProfileRequestType>(`auth/me`, data)
    },
}

export type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    token?: string
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type LogoutResponseType = {
    info: string
    error: string
}

type RegistrationResponseType = {
    addedUser: any,
    error?: string
}

export type updateProfileRequestType = {
    name?: string
    avatar?: string
}
export type updateProfileResponseType = {
    updatedUser: UserResponseType
    error?: string
}
