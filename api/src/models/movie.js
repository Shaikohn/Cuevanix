const mongoose = require('mongoose')
const { Schema } = mongoose

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    overview: { type: String, required: true },
    id: { type: Number, required: true },
    genres: {type: Array, required: true },
    adult: {type: Boolean, default: false},
    video: {type: Boolean, default: false},
    rating: { type: Number },
    release_date: { type: String, required: true },
    price: { type: Number, required: true },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

module.exports = mongoose.model('Movie', movieSchema)