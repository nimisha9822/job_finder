const express = require("express")
const {Register, Login}=require("../controllers/authController");
const userAuth = require("../middlewares/authMiddleware");
const router = express.Router();



router.post('/register',Register);
router.post('/login',Login)




module.exports=router