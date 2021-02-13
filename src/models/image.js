const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Image = new mongoose.model('Image', imageSchema)

module.exports = Image