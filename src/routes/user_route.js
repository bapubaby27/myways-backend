const express = require("express");
const router = express.Router();
const controller = require("../componenets/User");

router.post("/signIn", controller.signIn);

router.post("/signUp", controller.signUp);

router.post("/sendOtp", controller.otpVerification);

module.exports = router;
