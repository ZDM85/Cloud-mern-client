import axios from "axios";
import { API_URL } from "../utils/consts";


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});


$api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
});

$api.interceptors.response.use(config => {
    return config
}, async(error) => {
    if (error.response.status === 401) {
        
    }
})

export default $api;
