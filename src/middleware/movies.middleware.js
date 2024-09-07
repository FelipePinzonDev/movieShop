const Movie = require('../models/movies.model')

//Middleware

const getMovie = async (req, res, next) => {
  let movie
  const { id } = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: 'Pleas enter a valid ID',
    })
  }

  try {
    movie = await Movie.findById(id)
    if (!movie) {
      return res
        .status(404)
        .json({ message: 'Make sure the movie exists on db' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.movie = movie
  next()
}

module.exports = getMovie
