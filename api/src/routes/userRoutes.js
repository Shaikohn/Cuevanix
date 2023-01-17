const express = require('express')
const { signin, signup, getUsers, getUser, getProfile, googleUser, updateUserStatus, updateUserRole } = require('../controllers/userControllers')

const router = express.Router()

router.get('/:_id', getProfile)
router.get('/user/:_id', getUser)
router.get('/users/all', getUsers)
router.post('/googleUser', googleUser)
router.post('/signin', signin)
router.post('/signup', signup)
router.patch('/user/status/:_id', updateUserStatus)
router.patch('/user/role/:_id', updateUserRole)

module.exports = router 