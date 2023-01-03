import axios from "axios";
import { getAllMovies, getMovieById } from "../slices/movieSlice";

const apikey = '9d0aee88c318326033d3cc2001d4d5ed' 

export const getMovies = () => (dispatch) => {
    axios.get('http://localhost:3001/movies/all')
    .then(res => dispatch(getAllMovies(res.data)))
    .catch(e => console.log(e))
}

export const getDetails = (id) => (dispatch) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`)
    .then(res => dispatch(getMovieById(res.data)))
    .catch(e => console.log(e))
}