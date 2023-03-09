import axios from "axios";
import Swal from "sweetalert2";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

const API = axios.create({baseURL})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData, navigate, closeModal, setLoading, forceUpdate, setFormData, initialState) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await API.post("/user/signin", formData);
        dispatch({ type: AUTH, data });
        setLoading(false)
        setFormData(initialState)
        closeModal()
        navigate('/catalog')
        forceUpdate()
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

export const signUp = ( formData, closeModal, setLoading, e, setFormData, initialState) => async() => {
    setLoading(true)
    try {
        await API.post("/user/signup", formData);
        setLoading(false)
        setFormData(initialState)
        Swal.fire({
            title: "Signed up",
            text: "We have send you and email to verify your account!",
            icon: "success",
            timer: 2000,
        });
        e.target.reset()
        closeModal()
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

export const verifyUser = (_id) => async() => {
    try {
        await axios.patch(`http://localhost:3001/user/verification/${_id}`)
    }
    catch(e) {
        console.log(e)
    }
}

export const signGoogle = (googleUser, navigate, closeModal, setLoading, forceUpdate) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await API.post("/user/googleUser", googleUser);
        dispatch({ type: AUTH, data });
        setLoading(false)
        closeModal()
        navigate('/catalog')
        forceUpdate()
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

export const emailPassword = (sendEmail) => () => {
    try {
        axios.post(`http://localhost:3001/user/forgotPassword`, sendEmail)
        Swal.fire({
            title: "Mail sent",
            text: "Check your inbox!",
            icon: "success",
            timer: 2000,
        })
    }
    catch(e) {
        Swal.fire({
            title: "Not sent",
            text: "Something failed!",
            icon: "error",
            timer: 2000,
        })
    }
}

export const changePassword = (_id, newPassword, e) => async() => {
    /* setLoading(true) */
    try {
        await axios.patch(`http://localhost:3001/user/changePassword/${_id}`, newPassword)
        e.target.reset()
        Swal.fire({
            title: "Success",
            text: "Password updated!",
            icon: "success",
            timer: 2000,
        })
        /* setLoading(false) */
    }
    catch(e) {
        Swal.fire({
            title: "Not edited",
            text: "Something failed!",
            icon: "error",
            timer: 2000,
        })
        /* setLoading(false) */
    }
}