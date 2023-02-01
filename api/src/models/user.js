const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    id: { type: String },
    picture: { type: String },
    favourites: { type: Array },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    owner: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
})
module.exports = mongoose.model('User', userSchema)