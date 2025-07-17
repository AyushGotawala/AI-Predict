const express = require("express")
const emailSpamRoute = express.Router();
const spamEmailController = require("../controller/spamEmailController");
const verifyToken = require("../middleware/authMiddleware");

emailSpamRoute.get("/EmailHistory",verifyToken,spamEmailController.getEmailAnalysisData);
emailSpamRoute.get("/getFiveHistory",verifyToken,spamEmailController.getFiveAnayysis);
emailSpamRoute.post("/predictEmail",verifyToken,spamEmailController.spamEmail);
emailSpamRoute.delete("/EmailHistory/:id",verifyToken,spamEmailController.deleteEmailHistory);

module.exports = emailSpamRoute;