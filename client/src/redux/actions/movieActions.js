import axios from "axios";
import { getAllMovies, getMovieById } from "../slices/movieSlice";

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