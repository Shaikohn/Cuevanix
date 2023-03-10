const express = require('express')
const { signin, signup, getUsers, getUser, getProfile, googleUser, updateUserStatus, updateUserRole, updateUser, verifyUser, updatePassword, passwordEmail } = require('../controllers/userControllers')

const router = express.Router()

router.get('/:_id', getProfile)
router.get('/user/:_id', getUser)
router.get('/users/all', getUsers)
router.post('/googleUser', googleUser)
router.post('/signin', signin)
router.post('/signup', signup)
router.post('/forgotPassword', passwordEmail)
router.patch('/edit/:_id', updateUser)
router.patch('/status/:_id', updateUserStatus)
router.patch('/role/:_id', updateUserRole)
router.patch('/verification/:_id', verifyUser)
router.patch('/changePassword/:_id', updatePassword)

module.exports = router 