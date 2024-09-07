const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publication_date: String,
  original_language: String,
})

module.exports = mongoose.model('Movie', movieSchema)
