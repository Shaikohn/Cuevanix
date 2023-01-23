import axios from "axios";
import Swal from "sweetalert2";
import { getOrders, getProfile, getUser, getUsers } from "../slices/userSlice";

export const getAllUsers = () => (dispatch) => {
    axios.get('http://localhost:3001/user/users/all')
    .then(res => dispatch(getUsers(res.data)))
    .catch(e => console.log(e))
}

export const getProfileById = (_id) => (dispatch) => {
    axios.get(`http://localhost:3001/user/${_id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(e => console.log(e))
}

export const getUserById = (_id) => (dispatch) => {
    axios.get(`http://localhost:3001/user/user/${_id}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(e => console.log(e))
}

export const patchUser = (_id, editData) => (dispatch) => {
    axios.patch(`http://localhost:3001/user/edit/${_id}`, editData)
    .then(res => dispatch(getUser(res.data)),
    /* Swal.fire({
        title: "Edited",
        text: "User updated!",
        icon: "success",
        timer: 2000,
    }), */
    )
    .catch(e => console.log(e))
}

export const patchUserRole = (_id) => (dispatch) => {
    axios.patch(`http://localhost:3001/user/role/${_id}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(e => console.log(e))
}

export const patchUserStatus = (_id) => (dispatch) => {
    axios.patch(`http://localhost:3001/user/status/${_id}`)
    .then(res => dispatch(getUser(res.data)
    ))
    .catch(e => console.log(e))
}
export const getAllOrders = () => (dispatch) => {
    axios.get('http://localhost:3001/order/all')
    .then(res => dispatch(getOrders(res.data)))
    .catch(e => console.log(e))
}