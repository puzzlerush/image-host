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
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const populateAuthor = function (next) {
    const images = this
    images.populate({
        path: 'author',
        select: 'name'
    })
    next()
}

imageSchema.pre('find', populateAuthor)
imageSchema.pre('findOne', populateAuthor)

const Image = new mongoose.model('Image', imageSchema)

module.exports = Image