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
const getUsersWithPaginateAPI = (url: string) => {
    const urlBackend = `/api/v1/user?${url}`;
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend)
}
const createUserAPI = (fullName: string, password: string, email: string, phone: string) => {
    const urlBackend = `/api/v1/user`;
    return axios.post<IBackendRes<IUserTable>>(urlBackend, { fullName, email, password, phone });
}
const createListUsersAPI = (data: {
    fullName: string,
    password: string,
    email: string,
    phone: string
}[]) => {
    const urlBackend = `api/v1/user/bulk-create`;
    return axios.post<IBackendRes<IResponseImport>>(urlBackend, data);
}
const updateUserAPI = (_id: string | undefined, fullName: string, phone: string) => {
    const urlBackend = `/api/v1/user`;
    return axios.put<IBackendRes<IRegister>>(urlBackend, { _id, fullName, phone });
}
const deleteUserAPI = (_id: string) => {
    const urlBackend = `/api/v1/user/${_id}`;
    return axios.delete<IBackendRes<IDelete>>(urlBackend);
}
export { loginAPI, registerAPI, fetchAccountAPI, logoutAPI, getUsersWithPaginateAPI, createUserAPI, createListUsersAPI, updateUserAPI, deleteUserAPI }