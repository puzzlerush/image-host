const express = require('express')
const Image = require('../models/image')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const image = new Image(req.body)
        await image.save()
        res.status(201).send(image)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router