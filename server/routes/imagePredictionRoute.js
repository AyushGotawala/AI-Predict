const express = require('express');
const imagePredictRouter = express.Router();
const upload = require("../middleware/uploadMiddleware");
const imageController = require("../controller/imageController");

imagePredictRouter.post('/predictImage',upload.single('file'),imageController.predictImage);

module.exports = imagePredictRouter;