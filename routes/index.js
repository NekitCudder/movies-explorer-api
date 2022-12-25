const express = require('express');
const userRouter = require('./users');
const movieRouter = require('./movie');
const { loginValidation, userValidation } = require('../middlewares/validations');
const { login, createUser, signOut } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const errorMessagesRoutes = require('../errors/ErrorMessages');

const router = express();

router.post('/signin', loginValidation, login);
router.post('/signup', userValidation, createUser);
router.post('/signout', auth, signOut);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', () => {
  throw new NotFoundError(errorMessagesRoutes.notFoundError);
});

module.exports = router;
