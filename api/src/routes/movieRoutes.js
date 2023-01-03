const express = require('express')
const { getMovies } = require('../controllers/movieControllers')

const router = express.Router()

router.get('/all', getMovies)

module.exports = router 