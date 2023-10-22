const mongoose = require("mongoose");


const applicationSchema= new mongoose.Schema({
    UserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    company :{
        type : String,
        required : true
    },
    position:{
        type : String,
        required: true
    },
    status:{
        type : String,
        default : "Pending"
    }
},{timestamps : true})


module.exports=new mongoose.model("Application",applicationSchema)