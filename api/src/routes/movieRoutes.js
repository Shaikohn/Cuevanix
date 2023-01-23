const express = require('express')
const { getMovies, getMovieById, getMovieVideo, deleteMovie, getMovieAdmin, getResults } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)
router.get('/results?keyword=keyword', getResults)
router.get('/:id', getMovieById)
router.get('/admin/:id', getMovieAdmin)
router.get('/purchasedMovieVideo/:id', getMovieVideo)
router.delete('/:id', deleteMovie)

module.exports = router 