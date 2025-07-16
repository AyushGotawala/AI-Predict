const axios = require('axios');
require("dotenv").config();

const spamEmail = async (req, res, next) => {
    try {
        const email = req.body.text;
        
        const response = await axios.post(process.env.SPAM_EMAIL_URL, {
            text: email
        });
        return res.status(200).json({ prediction: response.data.prediction });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get prediction from Spam Detection API",
            error: error?.response?.data?.error || error.message
        });
    }
};

module.exports = { spamEmail };
