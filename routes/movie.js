const movieRouter = require('express').Router();
const { getMovie, createMovie, deleteMovie } = require('../controllers/movie');
const { idValidation, movieValidation } = require('../middlewares/validations');

movieRouter.get('/', getMovie);
movieRouter.post('/', movieValidation, createMovie);
movieRouter.delete('/:_id', idValidation, deleteMovie);

module.exports = movieRouter;
