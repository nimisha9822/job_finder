const express = require("express")
const userAuth= require("../middlewares/authMiddleware");
const {updateUser, findUserJob, applyJob, findUser} = require("../controllers/userController");
const router = express.Router();


router.put('/update-user',userAuth,updateUser)
router.get('/findAppliedJob',userAuth,findUserJob)
router.get('/findUser',userAuth,findUser)
router.post('/applyJob',userAuth,applyJob)

module.exports=router