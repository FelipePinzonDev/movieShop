const express = require('express')
const mongoose = require('mongoose')
const { config } = require('dotenv')
const bodyParser = require('body-parser')

config()
const movieRoutes = require('./routes/movies.routes')

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection

app.use('/movies', movieRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
