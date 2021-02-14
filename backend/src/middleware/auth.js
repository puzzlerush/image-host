const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id)

        if (!user) {
            throw new Error()
        }

        if (!user.tokens.includes(token)) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate' })
    }
}

module.exports = auth