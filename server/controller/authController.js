const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const Login = async(req,res,next) =>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const isMatched = await bcrypt.compare(password,user.password);
            
            if(!isMatched){
                return res.status(401).json({
                    message : 'invalid credentials'
                })
            }

            const token = jwt.sign(
                {userId : user._id,username : user.username},
                process.env.JWT_SECRET,
                {expiresIn : process.env.JWT_EXPIRES_IN || '1h'}
            );

            return res.status(200).json({
                success : true,
                message : 'Login Successfully',
                token : token,
                user : {
                    _id : user._id,
                    username : user.username,
                    email : user.email
                }
            })
        }

        return res.status(404).json({
            message :  `User is Not available with username : ${username}`
        });
    }catch(error){
        return res.status(500).json({message : error.message});
    }
}

module.exports = {SignUp,Login};