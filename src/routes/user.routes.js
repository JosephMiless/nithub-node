const {Router} = require('express');
const { signUpUserController } = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/signup', signUpUserController);

module.exports = userRouter;