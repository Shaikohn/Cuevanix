import axios from "axios";
import Swal from "sweetalert2";
import { getOrders, getProfile, getUser, getUsers } from "../slices/userSlice";

export const getAllUsers = () => async(dispatch) => {
    try {
        const { data } = await axios.get('https://cuevanix-backend.onrender.com/user/users/all')
        dispatch(getUsers(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getProfileById = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`https://cuevanix-backend.onrender.com/user/${_id}`)
        dispatch(getProfile(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getUserById = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`https://cuevanix-backend.onrender.com/user/user/${_id}`)
        dispatch(getUser(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const patchUser = (_id, editData, setLoading, closeModal, forceUpdate) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await axios.patch(`https://cuevanix-backend.onrender.com/user/edit/${_id}`, editData)
        dispatch(getUser(data))
        Swal.fire({
            title: "Edited",
            text: "User updated!",
            icon: "success",
            timer: 2000,
        })
        setLoading(false)
        forceUpdate()
        closeModal()
    }
    catch(e) {
        Swal.fire({
            title: "Not edited",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        })
        setLoading(false)
    }
}

export const patchUserRole = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.patch(`https://cuevanix-backend.onrender.com/user/role/${_id}`)
        dispatch(getUser(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const patchUserStatus = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.patch(`https://cuevanix-backend.onrender.com/user/status/${_id}`)
        dispatch(getUser(data))
    }
    catch(e) {
        console.log(e)
    }
}
export const getAllOrders = () => async(dispatch) => {
    try {
        const { data } = await axios.get('https://cuevanix-backend.onrender.com/order/all')
        dispatch(getOrders(data))
    }
    catch(e) {
        console.log(e)
    }
}