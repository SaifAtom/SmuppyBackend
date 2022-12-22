const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')
const followController = require("../controllers/user-subcontrollers/follow-controller")
const path = require('path');

//auth
router.post("/signup",authController.user_signup)
router.post("/login",authController.user_login)
router.get("/verification/:code", authController.user_verification)
router.get("/verification/assets/icons/love_icon.png",(req,res)=>{
    res.sendFile(path.join(__dirname,"../vues/assets/icons/love_icon.png"))
})

//following
router.patch("/follow",followController.follow)
router.get("/count_followers/:id",followController.countFollowers)

module.exports = router