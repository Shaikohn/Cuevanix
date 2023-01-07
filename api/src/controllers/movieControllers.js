const axios = require("axios")
const Movie = require ("../models/movie")
const {
    APIKEY
} = process.env

const getMovies = async(req, res, next) => {
    try {
        /* let moviePromiseApi = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`) */
        let allMovies = await Movie.find({})
        res.status(200).json(allMovies)
    }
    catch(error) {
        next(error)
    }
}

const getMovieById = async (req, res, next) => {
    const {_id} = req.params
    try {
        let movie = await Movie.findById({_id: _id})
            /* let moviePromiseApi = await (axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)) */
            /* Promise.all([moviePromiseApi])
        .then((response) => {
            const [movieApi] = response
            let filteredMovieApi = movieApi.data.results.map((m) => {
                return {
                    id: m.id,
                    title: m.title,
                    image: `https://image.tmdb.org/t/p/w500/${m.poster_path}`,
                    overview: m.overview,
                    rating: m.vote_average,
                    video: m.video,
                    release_date: m.release_date,
                    genres: m.genre_ids,
                    price: Math.random()*(50 - 10)
                }
            })
            movie = filteredMovieApi.filter(d => d.id == id)
            res.status(200).send(movie)
            console.log(movie)
        }) */
        res.status(200).json(movie)
    }
    catch (error) {
        next(error)
    }
} 

module.exports = {
    getMovies,
    getMovieById,
}