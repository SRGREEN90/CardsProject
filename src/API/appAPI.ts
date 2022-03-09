import {instance} from "./api";

export const appAPI =  {
  me() {
    return instance.post<UserResponseType>('/auth/me')
  }
}

export type UserResponseType = {
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