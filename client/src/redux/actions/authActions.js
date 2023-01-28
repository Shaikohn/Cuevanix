import axios from "axios";
import Swal from "sweetalert2";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

const API = axios.create({baseURL: 'http://localhost:3001'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData, navigate, closeModal, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await API.post("/user/signin", formData);
        dispatch({ type: AUTH, data });
        setLoading(false)
        closeModal()
        navigate('/catalog')
        Swal.fire({
            title: "Signed in",
            text: "User Signed in successfully!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        setLoading(false)
        Swal.fire({
            title: "Signed in failed",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
        console.log(e)
    }
}

export const signUp = (formData, navigate, closeModal, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await API.post("/user/signup", formData);
        dispatch({ type: AUTH, data });
        setLoading(false)
        closeModal()
        navigate('/catalog')
        Swal.fire({
            title: "Signed up",
            text: "User signed up successfully!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        setLoading(false)
        Swal.fire({
            title: "Signed up failed",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
    }
}

export const signGoogle = (googleUser, navigate, closeModal, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await API.post("/user/googleUser", googleUser);
        dispatch({ type: AUTH, data });
        setLoading(false)
        closeModal()
        navigate('/catalog')
        Swal.fire({
            title: "Signed in",
            text: "User Signed in successfully!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        setLoading(false)
        Swal.fire({
            title: "Signed in failed",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
        console.log(e)
    }
}