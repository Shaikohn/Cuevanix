const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    favourites: {type: Array},
    purchasedMovies: {type: Array},
})
module.exports = mongoose.model('User', userSchema)