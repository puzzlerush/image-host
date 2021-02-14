const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { response } = require('express')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.name, req.body.password)
        if (!user) {
            res.status(404).send()
        }
        const token = user.generateAuthToken()
        await user.save()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token !== req.token)
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name.toLowerCase() })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: 'Invalid updates' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router