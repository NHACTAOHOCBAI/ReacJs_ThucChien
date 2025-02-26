import axios from 'services/axios.customize'

const loginAPI = (username: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password }, {
        headers: {
            delay: 3000
        }
    })
}
const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend = "api/v1/user/register";
    return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone });
}
const fetchAccountAPI = () => {
    const urlBackend = "api/v1/auth/account";
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
        headers: {
            delay: 1000
        }
    });
}
const logoutAPI = () => {
    const urlBackend = "/api/v1/auth/logout";
    return axios.post<IBackendRes<ILogin>>(urlBackend)
}
export { loginAPI, registerAPI, fetchAccountAPI, logoutAPI }