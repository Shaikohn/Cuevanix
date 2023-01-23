const mongoose = require('mongoose')
const { Schema } = mongoose

const inquirieSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
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
module.exports = mongoose.model('Inquirie', inquirieSchema)