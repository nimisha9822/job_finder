const express =require("express");
const userAuth = require("../middlewares/authMiddleware");
const { createJob, getAllJobByUser, updateJob, deleteJob, jobStats } = require("../controllers/jobsController");

const router = express.Router();

router.post('/create-job',userAuth,createJob)
router.get('/get-userjobs',userAuth,getAllJobByUser)
router.put('/update-job/:id',userAuth,updateJob)
router.delete('/delete-job/:id',userAuth,deleteJob)
router.post('/job-stats',userAuth,jobStats)
module.exports=router;