const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    purchased_Movie: {
        type: Object,
        required: true
    }
})
module.exports = mongoose.model('Order', orderSchema)