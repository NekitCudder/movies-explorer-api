const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))

    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((userEmail) => {
      if (userEmail) {
        throw new ConflictError('Пользователь с данным email уже существует');
      } else {
        User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
          .then((user) => {
            if (user) {
              res.send({ data: user });
            } else {
              throw new NotFoundError('Запрашиваемый пользователь не найден.');
            }
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные.'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, secure: 'true', sameSite: 'none',
      })
        .send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt', { secure: 'true', sameSite: 'none' }).send({ message: 'Успешный выход из системы' });
};
