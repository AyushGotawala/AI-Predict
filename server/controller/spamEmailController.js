const axios = require('axios');
const crypto = require('crypto');
const Analysis = require('../model/analysis');
const mongoose = require('mongoose');
require("dotenv").config();

const hashInput = (input) => {
    return crypto.createHash('sha256').update(input).digest('hex');
};

const spamEmail = async (req, res, next) => {
    try {
        const email = req.body.text;
        const hashedContent = hashInput(email);

        // Checking if this analysis already exists
        const existingAnalysis = await Analysis.findOne({
            userId: req.user.userId,
            hashedContent: hashedContent,
            TypeOfAnalysis: 'email'
        });

        if (existingAnalysis) {
            return res.status(200).json({
                prediction: existingAnalysis.result,
                message: "Prediction returned from history."
            });
        }

        //Makeing the prediction request
        const response = await axios.post(process.env.SPAM_EMAIL_URL, {
            text: email
        });

        const userObjectID = new mongoose.Types.ObjectId(req.user.userId);

        const newAnalysis = new Analysis({
            userId: userObjectID,
            TypeOfAnalysis: 'email',
            Content : email,
            hashedContent: hashedContent,
            result: response.data.prediction,
        });

        await newAnalysis.save();

        return res.status(200).json({
            prediction: response.data.prediction,
            message: "Prediction generated and saved."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get prediction from Spam Detection API",
            error: error?.response?.data?.error || error.message
        });
    }
};

const getEmailAnalysisData = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const userObjectID = new mongoose.Types.ObjectId(userId);
        const predictions = await Analysis.find({ userId: userObjectID }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: predictions.length,
            data: predictions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user prediction history',
            error: error.message,
        });
    }
};

const deleteEmailHistory = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const history = await Analysis.findById(id);

        if(!history){
            return res.status(404).json({ error: "Email history not found" });
        }
        
        await history.deleteOne();
        res.json({ message: "Email history deleted successfully." });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete user prediction history',
            error: error.message,
        });
    }
}


module.exports = { 
    spamEmail, 
    getEmailAnalysisData,
    deleteEmailHistory
};
