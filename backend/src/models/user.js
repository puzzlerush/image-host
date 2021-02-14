const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [String]
}, {
    timestamps: true
})

userSchema.virtual('images', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    return userObj
}

userSchema.methods.generateAuthToken = function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat(token)
    return token
}

userSchema.statics.findByCredentials = async function(name, password) {
    const user = await this.findOne({ name: name.toLowerCase() })
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
        return user
    }
}

userSchema.pre('save', async function (next) {
    const user = this
    user.name = user.name.toLowerCase()
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
}) 

const User = new mongoose.model('User', userSchema)

module.exports = User