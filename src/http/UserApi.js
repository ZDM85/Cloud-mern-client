import axios from "axios";
import $api from ".";
import { API_URL } from "../utils/consts";
import { setUsers } from "../reducers/userReducer";



export const registration = async(email, password) => {
    try {
        const response = await $api.post(`${API_URL}/api/user/registration`, {email, password});
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await $api.post(`${API_URL}/api/user/login`, {email, password});
            console.log(response);
            dispatch(setUsers(response.data.user));
            localStorage.setItem("token", response.data.accessToken);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            const response = await $api.post(`${API_URL}/api/user/logout`);
            dispatch(logout(response.data));
            localStorage.removeItem("token");
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const checkAuth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/user/refresh`, {withCredentials: true});
            dispatch(setUsers(response.data.user));
            localStorage.setItem("token", response.data.accessToken);
        } catch (e) {
            console.log(e);
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append("file", file); 
            const response = await $api.post(`${API_URL}/api/files/avatar`, formData);
            dispatch(setUsers(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await $api.delete(`${API_URL}/api/files/avatar`);
            dispatch(setUsers(response.data));
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}