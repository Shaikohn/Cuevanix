const express = require('express')
const { postComment, deleteComment } = require('../controllers/commentControllers')

const router = express.Router()

router.post('/add', postComment)
router.delete('/:userId/:_id/:movieId', deleteComment);

module.exports = router 