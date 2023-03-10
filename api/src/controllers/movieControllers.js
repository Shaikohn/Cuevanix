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
    const {id} = req.params
    try {
        let movieDb = await Movie.findOne({id}).populate("comments")
            if (movieDb) {
                res.status(200).send(movieDb)
            } else {
                let moviePromiseApi = await (axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`)) 
            Promise.all([moviePromiseApi])
        .then((response) => {
            const [movieApi] = response
            let filteredMovieApi =  {
                    id: movieApi.data.id,
                    title: movieApi.data.title,
                    image: `https://image.tmdb.org/t/p/w500/${movieApi.data.poster_path}`,
                    overview: movieApi.data.overview,
                    rating: (movieApi.data.vote_average).toFixed(2),
                    video: movieApi.data.video,
                    release_date: movieApi.data.release_date,
                    genres: movieApi.data.genres,
                    price: Math.ceil(Math.random()*(50 - 10))
                }
                const movie = new Movie(filteredMovieApi)
                movie.save()
                res.status(200).send(movie)
            }
        )
            }
            }
    catch (error) {
        next(error)
    }
} 

const getMovieVideo = async (req, res, next) => {
    const {id} = req.params
    try {
        let videoPromise = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`)
        Promise.all([videoPromise])
        .then((response) => {
            const [video] = response
            let filteredVideo =  video.data.results.map((m) => {
                return {
                    id: m.id,
                    name: m.name,
                    size: m.size,
                    type: m.type,
                    official: m.official,
                    site: m.site,
                    key: m.key,
                }
            })
                res.status(200).send(filteredVideo)
            }
        )
        }
    catch (error) {
        next(error)
    }
}

const getResults = async (req, res, next) => {

    const { keyword } = req.params

    let results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&page=1&include_adult=false&query=${keyword}`)
    res.status(200).json(results.data.results)
}

const updateMovie = async(req, res, next) => {
    const { id } = req.params
    const { price, overview } = req.body
    try {
        const movie = await Movie.findOne({id}).populate('comments')
        await movie.updateOne({ 
            price,
            overview
        })
        movie.save()
        const movieUpdated = await Movie.findOne({id}).populate('comments')
        return res.status(200).json(movieUpdated)
        } catch (error) {
            console.log(error);
        }
}

const deleteMovie = async (req, res, next) => {
    try {
        const {id} = req.params
        let movie = await Movie.findOne({id})
        await movie.remove()
        res.status(200).send({message: "Movie deleted succesfully!"})
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    getMovies,
    getMovieById,
    getMovieVideo,
    getResults,
    updateMovie,
    deleteMovie
}