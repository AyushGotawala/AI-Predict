const mongoose = require("mongoose")
const {Schema} = mongoose;

const analysis = new Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User',
        require : true
    },
    TypeOfAnalysis : {
        type : String,
        require : true
    },
    Content: {                
        type: String,
        required: true
    },
    hashedContent : {
        type : String,
        require : true
    },
    result : {
        type : String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

analysis.index({userId : 1,content : 1},)

module.exports = mongoose.model('Analysis',analysis);