const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
    userName: {
        type: String,
    },
    movieName: {
        type: String,
    },
    userId: {
        type: String,
    },
    movieId: {
        type: String,
    },
})
module.exports = mongoose.model('Comment', commentSchema)