import axios from "axios";
import { getUser, getUsers } from "../slices/userSlice";

export const getAllUsers = () => (dispatch) => {
    axios.get('http://localhost:3001/movies/all')
    .then(res => dispatch(getUsers(res.data)))
    .catch(e => console.log(e))
}

export const getUserById = (_id) => (dispatch) => {
    axios.get(`http://localhost:3001/user/${_id}`)
    .then(res => dispatch(getUser(res.result._id)))
    .catch(e => console.log(e))
}