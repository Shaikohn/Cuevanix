import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        details: {}
    },
    reducers: {
        getAllMovies: (state, action) => {
            state.movies = action.payload
        },
        getMovieById: (state, action) => {
            state.details = action.payload
        },
        clearMovie: (state) => {
            state.details = {}
        }
    }
})

export const {getAllMovies, getMovieById, clearMovie} = moviesSlice.actions
export default moviesSlice.reducer