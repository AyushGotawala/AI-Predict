const express = require("express")
const emailSpamRoute = express.Router();
const spamEmailController = require("../controller/spamEmailController");
const verifyToken = require("../middleware/authMiddleware");

emailSpamRoute.post("/predictEmail",verifyToken,spamEmailController.spamEmail);

module.exports = emailSpamRoute;