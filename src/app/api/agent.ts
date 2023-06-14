import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { TodoItem } from "../models/todoItem";
import { Vendor } from "../models/vendor";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

// axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.defaults.baseURL = 'https://localhost:7257/api';

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    console.log('We are inside th agent line 15...my koment')
    console.log(JSON.stringify(error))
    const { data, status } = error.request.response!;
    // const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Todos = {
    list: () => requests.get<TodoItem[]>('/todos'),
    details: (id: string) => requests.get<TodoItem>(`/todos/${id}`),
    create: (todo: any) => axios.post<void>('/todos', todo),
    update: (todo: any) => axios.put<void>(`/todos/${todo.id}`, todo),
    delete: (id: string) => axios.delete<void>(`/todos/${id}`)
}

const Vendors = {
    list: () => requests.get<Vendor[]>('/vendors'),
    details: (id: string) => requests.get<Vendor>(`/vendors/${id}`),
    create: (vendor: any) => axios.post<void>('/vendors', vendor),
    update: (vendor: any) => axios.put<void>(`/vendors/${vendor.id}`, vendor),
    delete: (id: string) => axios.delete<void>(`/vendors/${id}`)
}

const agent = {
    Todos,
    Vendors
}

export default agent;