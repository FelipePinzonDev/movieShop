const express = require('express')
const router = express.Router()
const Movie = require('../models/movies.model')
const getMovie = require('../middleware/movies.middleware')

//Get all

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    if (movies.length === 0) {
      return res.status(204).json([])
    }
    res.json(movies)
  } catch (error) {
    returnres.status(500).json({ message: error.message })
  }
})

//Create new movie

router.post('/', async (req, res) => {
  const { title, author, genre, publication_date, original_language } =
    req?.body
  if (!title || !author || !genre || !publication_date || !original_language) {
    return res.status(400).json({ message: 'All fields are necessary' })
  }

  const movie = new Movie({
    title,
    author,
    genre,
    publication_date,
    original_language,
  })

  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get one movie

router.get('/:id', getMovie, async (req, res) => {
  res.json(res.movie)
})

//Update all data

router.put('/', getMovie, async (req, res) => {
  try {
    const movie = res.movie
    movie.title = req.body.title || movie.title
    movie.author = req.body.author || movie.author
    movie.genre = req.body.genre || movie.genre
    movie.publication_date = req.body.publication_date || movie.publication_date
    movie.original_language =
      req.body.original_language || movie.original_language

    const updateMovie = await movie.save()
    res.json(updateMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Update at least one field

router.patch('/', getMovie, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.genre &&
    !req.body.publication_date &&
    !req.body.original_language
  ) {
    res.status(400).json({ message: 'At least u need to pass one field' })
  }

  try {
    const movie = res.movie
    movie.title = req.body.title || movie.title
    movie.author = req.body.author || movie.author
    movie.genre = req.body.genre || movie.genre
    movie.publication_date = req.body.publication_date || movie.publication_date
    movie.original_language =
      req.body.original_language || movie.original_language

    const updateMovie = await movie.save()
    res.json(updateMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete one book

router.delete('/:id', getMovie, async (req, res) => {
  const movie = res.movie

  try {
    await movie.deleteOne({ _id: movie._id })
    res.json({
      message: `The movie "${movie.title}" was successfully deleted`,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

module.exports = router
