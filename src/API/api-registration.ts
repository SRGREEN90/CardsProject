import {instance} from "./api";

export const registrationAPI =  {
  register(email: string, password: string) {
    return instance.post<any>('/auth/register', {email, password })
  }
}