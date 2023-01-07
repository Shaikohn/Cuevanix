const express = require('express')
const { getMovies, getMovieById } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)
router.get('/:_id', getMovieById)

module.exports = router 