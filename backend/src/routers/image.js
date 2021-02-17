const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Image = require('../models/image')
const auth = require('../middleware/auth')
const optionalAuth = require('../middleware/optionalAuth')

const router = express.Router()

const upload = multer({
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
            cb(null, true)
        } else {
            cb(new Error('File must be of type .png, .jpg, or .jpeg'))
        }
    }
})

router.post('/', optionalAuth, upload.single('image'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        const image = new Image({
            title: req.body.title,
            file: buffer
        })
        if (req.user) {
            image.author = req.user._id
        }
        await image.save()
        res.status(201).send(image)
    } catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/all', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const images = await Image.find({}).limit(limit).skip(skip).sort({ 'createdAt': -1 })
        res.send(images)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id)

        if (!image) {
            return res.status(404).send()
        }

        res.send(image)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:id/file', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id)

        if (!image) {
            return res.status(404).send()
        }

        res.set('Content-Type', 'image/png').send(image.file)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const image = await Image.findOneAndUpdate({
            _id: req.params.id,
            author: req.user._id
        }, req.body, { new: true })

        if (!image) {
            return res.status(404).send()
        }
        await image.save()
        res.send(image)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const image = await Image.findOneAndDelete({ 
            _id: req.params.id, 
            author: req.user._id 
        })

        if (!image) {
            return res.status(404).send()
        }

        res.send(image)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router