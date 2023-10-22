const dotenv=require("dotenv")
const mongoose=require("mongoose")
const connectDb=require("./config/db")
const JobsModel = require("./models/jobsModel")
const JobsData= require("./jobsData")


dotenv.config();
connectDb();


const importData=async()=>{
    try {
        await JobsModel.deleteMany();
        await JobsModel.insertMany(JobsData);
        console.log("Data Imported")
        process.exit();
    } catch (error) {
        
        
        console.log(error)
        process.exit(1);
    }
}
const destroyData= async()=>{

}
if(process.argv[2]==='d'){
    destroyData();
}else{
    importData();
}

