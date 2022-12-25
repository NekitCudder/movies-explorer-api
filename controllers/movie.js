const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessagesMovies = require('../errors/ErrorMessages');

module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body, owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessagesMovies.badRequestError));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError(errorMessagesMovies.notFoundError);
    })
    .then((data) => {
      if (data.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params._id)
          .then((newMovie) => {
            res.send({ data: newMovie });
          })
          .catch(next);
      } else {
        throw new ForbiddenError(errorMessagesMovies.forbiddenError);
      }
    })
    .catch(next);
};
