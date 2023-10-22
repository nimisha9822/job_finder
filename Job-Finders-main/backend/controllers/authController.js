const User = require("../models/userModels")
const jwt = require('jsonwebtoken')
const bcryptjs =require("bcryptjs")
const genreateToekn=async(id)=>{
    return await jwt.sign({userId : id},process.env.JWT_SECRET,{expiresIn : '1d'});
}
const comparePassword=async(password,hashedPassword)=>{
    const isMatch = await bcryptjs.compare(password,hashedPassword)
     return isMatch
}
const Register=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body
        if(!name){
            // return res.status(400).send({
            //     success : false,
            //     message : "Please provide Name"
            // })
            next("Name is required")
        }
        if(!email){
            // return res.status(400).send({
            //     success : false,
            //     message : "Please provide Email"
            // })
            next("Email is required")
        }
        if(!password){
            // return res.status(400).send({
            //     success : false,
            //     message : "Please provide password"
            // })
            next("Password is required")
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            // return res.status(200).send({
            //     success : false,
            //     message : "Email already registered please login"
            // })
            next("Email already registered please login")
        }
        
        
        const user = await new User(req.body)
        const token =await genreateToekn(User._id)
        await user.save();
        return res.status(200).send({
            success : true,
            message : "Registration successfull",
            user:{
                name : user.name,
                lastName : user.lastName,
                email : user.email,
                location : user.location
            },
            token
        })

    } catch (error) {
        // res.status(400).send({
        //     success : false,
        //     message : "Error in Registration",
        //     error
        // })
        next(error)
    }

}


const Login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            next("Please Enter all the fields")
        }
        const findUser = await User.findOne({email}).select("+password")
        if(!findUser){
            next("Invalid Username or Password")
        }
        const isMatch= await comparePassword(password,findUser.password)
        if(!isMatch){
            next("Invalid Password")
        }
        const token =await genreateToekn(findUser._id)
        findUser.password = undefined;
        res.status(200).send({
            success : true,
            message : "Login successfully",
            findUser,
            token
        })
    } catch (error) {
        next(error)
    }
}
module.exports={Register,Login}