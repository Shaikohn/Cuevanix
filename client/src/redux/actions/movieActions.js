import axios from "axios";
import { getAllMovies, getMovieById, getPurchased, getVideos } from "../slices/movieSlice";

export const getMovies = () => (dispatch) => {
    axios.get('http://localhost:3001/movies/all')
    .then(res => dispatch(getAllMovies(res.data)))
    .catch(e => console.log(e))
}

export const getDetails = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/${id}`)
    .then(res => dispatch(getMovieById(res.data)))
    .catch(e => console.log(e))
}

export const getPurchasedMovie = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/purchasedMovie/${id}`)
    .then(res => dispatch(getPurchased(res.data)))
    .catch(e => console.log(e))
}

export const getMovieVideos = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/movies/purchasedMovieVideo/${id}`)
    .then(res => dispatch(getVideos(res.data)))
    .catch(e => console.log(e))
}