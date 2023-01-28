const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    userId: {
        type: String,
    },
})
module.exports = mongoose.model('Message', messageSchema)