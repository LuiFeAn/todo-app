import axios from 'axios';
import todoApiRequestInterceptor from './http/todo-api-request-interceptor';

export const todoAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});


todoAPI.interceptors.request.use(todoApiRequestInterceptor);