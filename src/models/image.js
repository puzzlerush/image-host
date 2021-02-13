const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: Buffer,
        required: true
    }
}, {
    timestamps: true
})

imageSchema.methods.toJSON = function () {
    const image = this
    const imageObj = image.toObject()
    delete imageObj.file
    return imageObj
}

const Image = new mongoose.model('Image', imageSchema)

module.exports = Image