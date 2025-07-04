require('dotenv').config();
const express = require("express");
const authRouter = require("./routes/authRoute");
const { default: mongoose } = require('mongoose');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/api/auth',authRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB Connected.....');
    app.listen(port,()=>{
        console.log(`Your application is Running on http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log('error : ',err);
})