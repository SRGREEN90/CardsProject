import axios from 'axios';



export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    sendMail() {
        return instance.post(`auth/forgot`, {email: "jmsbrown63@gmail.com",
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
            </div>`})
             .then(response => response.data)
    },

    recoveryPassword(password: string, resetPasswordToken: string){
            return instance.post(`auth/password-recovery`,{password, resetPasswordToken})
                .then(response => response.data)
        }


}
