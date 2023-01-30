import axios from "axios";
import Swal from "sweetalert2";
import { getOrders, getProfile, getUser, getUsers } from "../slices/userSlice";

export const getAllUsers = () => async(dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/user/users/all')
        dispatch(getUsers(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getProfileById = (_id) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/user/${_id}`)
        dispatch(getProfile(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getUserById = (_id) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/user/user/${_id}`)
        dispatch(getUser(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const patchUser = (_id, editData, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const res = await axios.patch(`http://localhost:3001/user/edit/${_id}`, editData)
        dispatch(getUser(res.data))
        Swal.fire({
            title: "Edited",
            text: "User updated!",
            icon: "success",
            timer: 2000,
        })
        setLoading(false)
    }
    catch(e) {
        Swal.fire({
            title: "Not edited",
            text: "Something failed!",
            icon: "success",
            timer: 2000,
        })
        setLoading(false)
    }
}

export const patchUserRole = (_id) => async(dispatch) => {
    try {
        const res = await axios.patch(`http://localhost:3001/user/role/${_id}`)
        dispatch(getUser(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const patchUserStatus = (_id) => async(dispatch) => {
    try {
        const res = await axios.patch(`http://localhost:3001/user/status/${_id}`)
        dispatch(getUser(res.data))
    }
    catch(e) {
        console.log(e)
    }
}
export const getAllOrders = () => async(dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/order/all')
        dispatch(getOrders(res.data))
    }
    catch(e) {
        console.log(e)
    }
}