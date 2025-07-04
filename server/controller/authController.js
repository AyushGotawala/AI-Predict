const User = require("../model/user");
const bcrypt = require("bcrypt");

const SignUp = async(req,res,next) =>{
    const {username , email , password} = req.body;
    try{    
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message : 'User already Exists'
            })
        }

        //password hashing....
        const hasedPassword = await bcrypt.hash(password,12);
    
        const user = new User({
            username : username,
            email : email,
            password : hasedPassword
        })

        await user.save();

        return res.status(201).json({
            message : 'User Registred Successfully....',
            user : {
                _id : user._id,
                username : user.username,
                email : user.email,
                createdAt : user.createdAt
            }
        });
    }catch(error){
        return res.status(500).json({message : error.message});
    }
}

module.exports = {SignUp};