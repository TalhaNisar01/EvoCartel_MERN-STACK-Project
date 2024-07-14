const express = require('express');
const router = express.Router();
const { userSignUp } = require('../controller/userSignUp'); // Make sure this path is correct
const { userSignIn } = require('../controller/userSignIn'); // Make sure this path is correct
const {userDetails} =require("../controller/userDetails")
const {authToken} =require("../middleware/authToken")

router.post("/signup", userSignUp); 
router.post("/signin",userSignIn)
router.get("/user-details",authToken,userDetails)



module.exports = router;
