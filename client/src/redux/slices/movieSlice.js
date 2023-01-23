import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        filteredMovies: [],
        results: [],
        filteredResults: [],
        details: null,
        purchasedMovie: {},
        adminMovie: null,
        videos: [],
    },
    reducers: {
        getAllMovies: (state, action) => {
            state.movies = action.payload
            state.filteredMovies = action.payload
        },
        getResults: (state, action) => {
            state.results = action.payload
            state.filteredResults = action.payload
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
        orderByTitle: (state, action) => {
            const orderMoviesTitle = action.payload === "title_asc" ?
                state.filteredMovies.slice().sort(function(a, b) {
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {return -1}
                    if(b.title.toLowerCase() < a.title.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.filteredMovies.slice().sort(function(a, b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {return -1}
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredMovies: orderMoviesTitle
        }
        },
        orderByRating: (state, action) => {
            const orderMoviesRating = action.payload === "rating_asc" ?
                state.filteredMovies.slice().sort(function(a, b) {
                    if(parseInt(a.rating) < parseInt(b.rating)) {return -1}
                    if(parseInt(b.rating < a.rating)) {return 1}
                    return 0;
                }) : 
                state.filteredMovies.slice().sort(function(a, b) {
                    if(parseInt(a.rating) > parseInt(b.rating)) {return -1}
                    if(parseInt(a.rating) > parseInt(b.rating)) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredMovies: orderMoviesRating
        }
        },
        orderByPrice: (state, action) => {
            const orderMoviesPrice = action.payload === "price_asc" ?
                state.filteredMovies.slice().sort(function(a, b) {
                    if(parseInt(a.price) < parseInt(b.price)) {return -1}
                    if(parseInt(b.price < a.price)) {return 1}
                    return 0;
                }) : 
                state.filteredMovies.slice().sort(function(a, b) {
                    if(parseInt(a.price) > parseInt(b.price)) {return -1}
                    if(parseInt(a.price) > parseInt(b.price)) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredMovies: orderMoviesPrice
        }
        },
        resultByTitle: (state, action) => {
            const orderResultsTitle = action.payload === "title_asc" ?
                state.filteredResults.slice().sort(function(a, b) {
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {return -1}
                    if(b.title.toLowerCase() < a.title.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.filteredResults.slice().sort(function(a, b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {return -1}
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredResults: orderResultsTitle
        }
        },
        resultByRating: (state, action) => {
            const orderResultsRating = action.payload === "rating_asc" ?
                state.filteredResults.slice().sort(function(a, b) {
                    if(parseInt(a.rating) < parseInt(b.rating)) {return -1}
                    if(parseInt(b.rating < a.rating)) {return 1}
                    return 0;
                }) : 
                state.filteredResults.slice().sort(function(a, b) {
                    if(parseInt(a.rating) > parseInt(b.rating)) {return -1}
                    if(parseInt(a.rating) > parseInt(b.rating)) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredResults: orderResultsRating
        }
        },
        clearMovie: (state) => {
            state.details = null
        },
        clearMovieAdmin: (state) => {
            state.adminMovie = null
        },
        clearPurchasedMovie: (state) => {
            state.purchasedMovie = {}
        },
        clearVideos: (state) => {
            state.videos = []
        },
    }
})

export const {getAllMovies, getMovieById, getPurchased, getVideos, getMovieDetails, orderByTitle, orderByRating, orderByPrice, resultByTitle, resultByRating, clearMovie, clearMovieAdmin, clearPurchasedMovie, clearVideos} = moviesSlice.actions
export default moviesSlice.reducer