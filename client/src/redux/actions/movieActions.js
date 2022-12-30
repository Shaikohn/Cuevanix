import axios from "axios";
import { getAllMovies, getMovieById } from "../slices/movieSlice";

const apikey = '9d0aee88c318326033d3cc2001d4d5ed' 
const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

export const getMovies = () => (dispatch) => {
    axios.get(endpoint)
    .then(res => dispatch(getAllMovies(res.data.results)))
    .catch(e => console.log(e))
}

export const getDetails = (id) => (dispatch) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`)
    .then(res => dispatch(getMovieById(res.data)))
    .catch(e => console.log(e))
}