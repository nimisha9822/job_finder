const mongoose =require("mongoose")

const jobSchema =new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Company name is required"],
    },
    position:{
        type : String,
        required:[true,'Job Position is required'],
        maxlength : 100
    },
    status:{
        type : String,
        enum :['pending','interview','reject'],
        default : "pending"
    },
    workType:{
        type : String,
        enum :['full-time','part-time','internship','contaract'],
        default : 'full-time'
    },
    workLocation:{
        type :String,
        default : "Mumbai",
        required:[true,'Work location is required']
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    appliedBy:[
       {
        
           UserId :{ type : mongoose.Schema.Types.ObjectId,
            ref : "User"},
            Name:String
        
       }
    ]
},{timestamps : true})



module.exports=new mongoose.model("Job",jobSchema)