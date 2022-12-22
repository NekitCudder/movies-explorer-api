const userRouter = require('express').Router();
const { updateUser, currentUser } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validations');

userRouter.get('/me', currentUser);
userRouter.patch('/me', userInfoValidation, updateUser);

module.exports = userRouter;
