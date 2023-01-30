import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        filteredMovies: [],
        results: [],
        filteredResults: [],
        resultPage: 1,
        details: null,
        purchasedMovie: {},
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
        /* firstPage: (state) => {
            state.resultPage = 1
        },
        previousResults: (state) => {
            state.resultPage--
        },
        nextResults: (state) => {
            state.resultPage++
        }, */
        getMovieById: (state, action) => {
            state.details = action.payload
        },
        getPurchased: (state, action) => {
            state.purchasedMovie = action.payload
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
                    if(parseInt(a.vote_average.toFixed(2)) < parseInt(b.vote_average.toFixed(2))) {return -1}
                    if(parseInt(b.vote_average.toFixed(2) < a.vote_average.toFixed(2))) {return 1}
                    return 0;
                }) : 
                state.filteredResults.slice().sort(function(a, b) {
                    if(parseInt(a.vote_average.toFixed(2)) > parseInt(b.vote_average.toFixed(2))) {return -1}
                    if(parseInt(a.vote_average.toFixed(2)) > parseInt(b.vote_average.toFixed(2))) {return 1}
                    return 0;
        })
        return {
            ...state,
            filteredResults: orderResultsRating
        }
        },
        filterGenre: (state, action) => {
            const movieFilter = state.filteredMovies
            const filter = action.payload === 'All' ?  state.filteredMovies : movieFilter.filter((m) => m.genres.name.includes(action.payload));
            return {
                ...state,
                filteredMovies: filter
            }
        },
        clearMovie: (state) => {
            state.details = null
        },
        clearResults: (state) => {
            state.filteredResults = []
        },
        clearPurchasedMovie: (state) => {
            state.purchasedMovie = {}
        },
        clearVideos: (state) => {
            state.videos = []
        },
    }
})

export const {getAllMovies, getMovieById, getPurchased, getResults, getVideos, orderByTitle, orderByRating, orderByPrice, resultByTitle, resultByRating, clearMovie, clearResults, clearPurchasedMovie, clearVideos} = moviesSlice.actions
export default moviesSlice.reducer