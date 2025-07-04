const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController');
const authLimiter = require("../controller/rateLimiter");


authRouter.post('/SignUp',authLimiter,authController.SignUp);
authRouter.post('/Login',authLimiter,authController.Login);

module.exports = authRouter;