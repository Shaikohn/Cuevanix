import axios from "axios";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

const API = axios.create({baseURL: 'http://localhost:3001'})

export const signIn = (formData, navigateTo) => async(dispatch) => {
    try {
        const { data } = await API.post("/user/signin", formData);
        dispatch({ type: AUTH, data });
        navigateTo('/catalog')
    } catch (e) {
        console.log(e)
    }
}

export const signUp = (formData, navigateTo) => async(dispatch) => {
    try {
        const { data } = await API.post("/user/signup", formData);
        dispatch({ type: AUTH, data });
        navigateTo('/catalog')
    } catch (e) {
        console.log(e)
    }
}