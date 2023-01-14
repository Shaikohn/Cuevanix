const express = require('express')
const { signin, signup, getUsers, getUser, googleUser } = require('../controllers/userControllers')

const router = express.Router()

router.get('/:_id', getUser)
router.get('/allUser', getUsers)
router.post('/googleUser', googleUser)
router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router 