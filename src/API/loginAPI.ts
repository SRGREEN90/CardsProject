import {instance} from "./api";

export const loginApi = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe})
    },
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}