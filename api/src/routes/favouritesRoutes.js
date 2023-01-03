const express = require('express')
const { addFavourite } = require('../controllers/favouritesControllers')

const router = express.Router()

router.post('/add', addFavourite)

module.exports = router 