import axios from "axios";
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

export const patchUserRole = (_id) => (dispatch) => {
    axios.patch(`http://localhost:3001/user/user/role/${_id}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(e => console.log(e))
}

export const patchUserStatus = (_id) => (dispatch) => {
    axios.patch(`http://localhost:3001/user/user/status/${_id}`)
    .then(res => dispatch(getUser(res.data)
    ))
    .catch(e => console.log(e))
}
export const getAllOrders = () => (dispatch) => {
    axios.get('http://localhost:3001/order/all')
    .then(res => dispatch(getOrders(res.data)))
    .catch(e => console.log(e))
}