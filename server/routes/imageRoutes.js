const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { predictImage } = require('../controller/imageController');

router.post('/predictImage', upload.single('file'), predictImage); 

module.exports = router;