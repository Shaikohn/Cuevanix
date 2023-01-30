import axios from "axios";
import Swal from "sweetalert2";
import { getAllMovies, getMovieById, getMovieDetails, getPurchased, getResults, getVideos } from "../slices/movieSlice";

export const getMovies = () => async(dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/movies/all')
        dispatch(getAllMovies(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getAllResults = (keyword) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/movies/results/${keyword}`)
        dispatch(getResults(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getDetails = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/movies/${id}`)
        dispatch(getMovieById(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getPurchasedMovie = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/movies/${id}`)
        dispatch(getPurchased(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getMovieVideos = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/movies/purchasedMovieVideo/${id}`)
        dispatch(getVideos(data))
        
    }
    catch(e) {
        console.log(e)
    }
}

export const patchMovie = (id, editMovie, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await axios.patch(`http://localhost:3001/movies/${id}`, editMovie)
        dispatch(getMovieById(data))
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
            icon: "error",
            timer: 2000,
        })
        setLoading(false)
    }
}

export const deleteMovie = (id, navigate) => async() => {
    try {
        await axios.delete(`http://localhost:3001/movies/${id}`)
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