const User = require("../models/userModels")
const Application = require("../models/applicationModel")
const Jobs = require("../models/jobsModel")
const jwt = require("jsonwebtoken")
const genreateToekn=async(id)=>{
    return await jwt.sign({userId : id},process.env.JWT_SECRET,{expiresIn : '1d'});
}
const updateUser =async(req,res,next)=>{
    const {name,email,lastName,location}=req.body;
    if(!name || !email || !lastName || !location){
        next("Please provide all fields")
    }
    const user = await User.findOne({email})
    user.name = name;
    user.lastName=lastName;
    user.email = email;
    user.location=location;
    await user.save();
    const token = genreateToekn(req.user._id)
    res.status(200).send({
        success : true,
        message : "Updated Successfully",
    })
    

}

const applyJob = async(req,res,next)=>{
    try {
        const {name,company,position,jobId}=req.body;
        if( !name || !company || !position || !jobId){
            next("Please Input all fields")
        }
        const existApply = await Application.findOne({UserId : req.user.userId,company : company,position :position});
        if(existApply){
            next("Already Applied")
        }
        const apply = await Application.create({
            UserId : req.user.userId,
            company : company,
            position:position
        });
        const updateJob = await Jobs.findByIdAndUpdate({_id : jobId},
            {$push:{appliedBy :{UserId : req.user.userId,Name:name}}},
            {new : true}
            )
        if(apply && updateJob){
            res.status(201).send({
                success: true,
                message : "Applied successfully"
            })
        }
    } catch (error) {
        next(error)
    }
}
//User ne kha kha apply krrkhahai
const findUserJob =async(req,res,next)=>{
    try {
        
        const appplied = await Application.find({UserId : req.user.userId});
        res.status(200).send({
            success : true,
            appplied
        })
    } catch (error) {
        next(error)
    }
} 
//UserDetails by User Id;
const findUser=async(req,res)=>{
    try {
        const {id}=req.body;
        if(!id){
            next("Please Enter Id")
        }
        const user = await User.findOne({_id : id});
        if(user){
            res.send(200).send({
                success : true,
                user
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports={updateUser,findUserJob,applyJob,findUser}