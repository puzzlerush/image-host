const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const imageRouter = require('./routers/image')

const app = express()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/images', imageRouter)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})