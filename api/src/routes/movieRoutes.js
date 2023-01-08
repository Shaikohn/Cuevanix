const express = require('express')
const { getMovies, getMovieById, getMovieVideo, getMoviePurchased } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)
router.get('/:id', getMovieById)
router.get('/purchasedMovie/:id', getMovieById)
router.get('/purchasedMovieVideo/:id', getMovieVideo)

module.exports = router 