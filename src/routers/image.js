const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Image = require('../models/image')

const router = express.Router()

const upload = multer({
    fileSize: 1000000
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        const image = new Image({ 
            title: req.body.title, 
            file: buffer 
        })
        await image.save()
        res.status(201).send()
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

router.put('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        if (!image) {
            return res.status(404).send()
        }
        await image.save()
        res.send(image)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id)
        
        if (!image) {
            return res.status(404).send()
        }

        res.send(image)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router