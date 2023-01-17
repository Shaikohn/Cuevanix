import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        details: {},
        purchasedMovie: {},
        adminMovie: {},
        videos: [],
    },
    reducers: {
        getAllMovies: (state, action) => {
            state.movies = action.payload
        },
        getMovieById: (state, action) => {
            state.details = action.payload
        },
        getPurchased: (state, action) => {
            state.purchasedMovie = action.payload
        },
        getMovieDetails: (state, action) => {
            state.adminMovie = action.payload
        },
        getVideos: (state, action) => {
            state.videos = action.payload
        },
        clearMovie: (state) => {
            state.details = {}
        },
        clearMovieAdmin: (state) => {
            state.adminMovie = {}
        },
        clearPurchasedMovie: (state) => {
            state.purchasedMovie = {}
        },
        clearVideos: (state) => {
            state.videos = []
        },
    }
})

export const {getAllMovies, getMovieById, getPurchased, getVideos, getMovieDetails, clearMovie, clearMovieAdmin, clearPurchasedMovie, clearVideos} = moviesSlice.actions
export default moviesSlice.reducer