const express = require('express')
const { getMovies, getMovieById, getMovieVideo, deleteMovie, getResults, updateMovie } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)
router.get('/results?/:keyword', getResults)
router.get('/:id', getMovieById)
router.get('/purchasedMovieVideo/:id', getMovieVideo)
router.patch('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router 