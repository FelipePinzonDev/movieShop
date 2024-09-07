const express = require('express')
const { config } = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const movieRoutes = require('./routes/movies.routes')

config()

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME })

const db = mongoose.connection

app.use('/movies', movieRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
