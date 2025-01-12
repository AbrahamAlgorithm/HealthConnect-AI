import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

// const URL = window.location.origin || "http://127.0.0.1:4000/"
export const BASEURL = "http://127.0.0.1:4000/"

export const api = axios.create({
    baseURL: BASEURL,
})
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
);

// export default api