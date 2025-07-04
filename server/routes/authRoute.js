const express = require("express");
const authRouter = express.Router();
const { SignUp } = require('../controller/authController');

authRouter.post('/SignUp',SignUp);

module.exports = authRouter;