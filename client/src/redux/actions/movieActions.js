import axios from "axios";
import Swal from "sweetalert2";
import { getAllMovies, getMovieById, getMovieDetails, getPurchased, getResults, getVideos } from "../slices/movieSlice";

export const getMovies = () => async(dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/movies/all')
        dispatch(getAllMovies(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getAllResults = (keyword) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/movies/results/${keyword}`)
        dispatch(getResults(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getDetails = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/movies/${id}`)
        dispatch(getMovieById(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getPurchasedMovie = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/movies/${id}`)
        dispatch(getPurchased(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getMovieAdmin = (id) =>async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/movies/admin/${id}`)
        dispatch(getMovieDetails(res.data))
    }
    catch(e) {
        console.log(e)
    }
}


export const getMovieVideos = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/movies/purchasedMovieVideo/${id}`)
        dispatch(getVideos(res.data))
    }
    catch(e) {
        console.log(e)
    }
}

export const deleteMovie = (id, navigate) => () => {
    try {
        axios.delete(`http://localhost:3001/movies/${id}`)
        navigate('/movies')
        Swal.fire({
            title: "Deleted",
            text: "Movie deleted succesfully!",
            icon: "success",
            timer: 2000,
        });
    }
    catch(e) {
        console.log(e)
    }
}