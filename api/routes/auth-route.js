const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')
const followController = require("../controllers/user-subcontrollers/follow-controller")
const messageController = require("../controllers/user-subcontrollers/message-controllers")
const path = require('path');
const checkAuth = require('../middleware/check-auth');

//auth
router.post("/signup",authController.user_signup)
router.post("/login",authController.user_login)
router.get("/verification/:code", authController.user_verification)
router.get("/verification/assets/icons/love_icon.png",(req,res)=>{
    res.sendFile(path.join(__dirname,"../vues/assets/icons/love_icon.png"))
})

//following
router.patch("/follow",checkAuth, followController.follow)
router.get("/count_followers/",checkAuth, followController.countFollowers)
router.get("/followers",checkAuth, followController.getFollowers)
router.get("/followings",checkAuth, followController.getFollowings)

//Messages
router.post("/sendMessage", checkAuth, messageController.sendMessage)

module.exports = router