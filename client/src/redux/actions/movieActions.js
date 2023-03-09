import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { getAllMovies, getMovieById, getMovieDetails, getPurchased, getResults, getVideos } from "../slices/movieSlice";

export const getMovies = () => async(dispatch) => {
    try {
        const { data } = await axios.get('/movies/all')
        dispatch(getAllMovies(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getAllResults = (keyword, setLoading, navigate) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await axios.get(`/movies/results/${keyword}`)
        dispatch(getResults(data))
        setLoading(false)
        if(data.length < 1) {
            navigate("/catalog")
            Swal.fire({
                title: "Not Found",
                text: "Movie not found!",
                icon: "error",
                timer: 2000,
            })
        }
    }
    catch(e) {
        console.log(e)
        setLoading(false)
    }
}

export const getDetails = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/movies/${id}`)
        dispatch(getMovieById(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getPurchasedMovie = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/movies/${id}`)
        dispatch(getPurchased(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getMovieVideos = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/movies/purchasedMovieVideo/${id}`)
        dispatch(getVideos(data))
        
    }
    catch(e) {
        console.log(e)
    }
}

export const patchMovie = (id, editMovie, setLoading) => async(dispatch) => {
    setLoading(true)
    try {
        const { data } = await axios.patch(`/movies/${id}`, editMovie)
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
        await axios.delete(`/movies/${id}`)
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