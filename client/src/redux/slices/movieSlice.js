import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        details: {},
        purchasedMovie: {},
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
        getVideos: (state, action) => {
            state.videos = action.payload
        },
        clearMovie: (state) => {
            state.details = {}
        },
        clearPurchasedMovie: (state) => {
            state.purchasedMovie = {}
        },
        clearVideos: (state) => {
            state.videos = []
        },
    }
})

export const {getAllMovies, getMovieById, getPurchased, getVideos, clearMovie, clearPurchasedMovie, clearVideos} = moviesSlice.actions
export default moviesSlice.reducer