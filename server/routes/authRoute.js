const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController');
const authLimiter = require("../middleware/rateLimiter");
const { validateSignUp , validationLogin} = require("../middleware/validators");
const validateRequest = require("../middleware/validateRequest");

authRouter.post('/SignUp', authLimiter, validateSignUp, validateRequest, authController.SignUp);
authRouter.post('/Login',authLimiter,validationLogin,validateRequest,authController.Login);

module.exports = authRouter;