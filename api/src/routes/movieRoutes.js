const express = require('express')
const { getMovies, getMovieById, getMovieVideo, deleteMovie, getMovieAdmin } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)
router.get('/:id', getMovieById)
router.get('/admin/:id', getMovieAdmin)
router.get('/purchasedMovieVideo/:id', getMovieVideo)
router.delete('/:id', deleteMovie)

module.exports = router 