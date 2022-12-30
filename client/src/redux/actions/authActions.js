import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:3001'})

export const signIn = (formData) => async(dispatch) => {
    API.get('/user/signin')
    .then(res => dispatch())
    .catch(e => console.log(e))
}

export const signUp = (formData) => async(dispatch) => {
    API.get('/user/signup')
    .then(res => dispatch())
    .catch(e => console.log(e))
}