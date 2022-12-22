const mongoose = require('mongoose');
const { urlRegExp } = require('../middlewares/validations');

const cardSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: 'Неверный формат ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: 'Неверный формат ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlRegExp.test(url),
        message: 'Неверный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('card', cardSchema);
