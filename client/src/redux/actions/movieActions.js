import axios from "axios";
import Swal from "sweetalert2";
import { getAllMovies, getMovieById, getMovieDetails, getPurchased, getResults, getVideos } from "../slices/movieSlice";

export const getMovies = () => (dispatch) => {
    axios.get('http://localhost:3001/movies/all')
    .then(res => dispatch(getAllMovies(res.data)))
    .catch(e => console.log(e))
}

export const getAllResults = (keyword) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/results/${keyword}`)
    .then(res => dispatch(getResults(res.data)))
    .catch(e => console.log(e))
}

export const getDetails = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/${id}`)
    .then(res => dispatch(getMovieById(res.data)))
    .catch(e => console.log(e))
}

export const getPurchasedMovie = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/${id}`)
    .then(res => dispatch(getPurchased(res.data)))
    .catch(e => console.log(e))
}

export const getMovieAdmin = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/admin/${id}`)
    .then(res => dispatch(getMovieDetails(res.data)))
    .catch(e => console.log(e))
}


export const getMovieVideos = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/purchasedMovieVideo/${id}`)
    .then(res => dispatch(getVideos(res.data)))
    .catch(e => console.log(e))
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