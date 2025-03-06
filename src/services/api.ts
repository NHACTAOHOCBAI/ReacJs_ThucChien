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
const getBooksWithPaginateAPI = (url: string) => {
    const urlBackend = `/api/v1/book?${url}`;
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend)
}
const deleteBookAPI = (_id: string) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.delete<IBackendRes<IDelete>>(urlBackend);
}
const getCategories = () => {
    const urlBackend = `/api/v1/database/category`;
    return axios.get<IBackendRes<string[]>>(urlBackend);
}
const uploadFileAPI = (fileImg: any, folder: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios<IBackendRes<{
        fileUploaded: string
    }>>({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": folder
        },
    });
}
const createBookAPI = (thumbnail: string, slider: string[], mainText: string, author: string, price: number, quantity: number, category: string) => {
    const urlBackend = "/api/v1/book";
    const data = {
        thumbnail,
        slider,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.post<IBackendRes<IBook>>(urlBackend, data);
}
export {
    loginAPI, registerAPI, fetchAccountAPI, logoutAPI, getUsersWithPaginateAPI, createUserAPI, createListUsersAPI, updateUserAPI, deleteUserAPI,
    getBooksWithPaginateAPI, deleteBookAPI, getCategories, uploadFileAPI, createBookAPI
}