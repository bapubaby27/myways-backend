const User = require("./user.schema");
const _ = require("underscore");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const saltRounds = 10;
otpVerification = (req, res) => {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    to: req.body.email,
    from: process.env.EMAIL,
    subject: "OTP Verification from My Ways",
    text: "Your OTP is 734567",
  };
  smtpTransport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
    res.status(200).json({
      status: true,
      message: "Mail Sent",
      otp: 734567,
    });
  });
};

signUp = (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
    console.log(hash);
    let data = new User({ ...req.body, password: hash });
    data
      .save()
      .then((result) => {
        res.status(200).json({
          status: true,
          message: "Successfully added user",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err.message,
        });
      });
  });
};

signIn = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((result) => {
    // console.log(result);
    // bcrypt.compare(req.body.password, result.password).then((status) => {
    // 	console.log("status", status);
    // });
    if (_.isEmpty(result)) {
      res.status(200).json({
        status: false,
        message: "No such User",
      });
    } else {
      console.log(result);
      bcrypt
        .compare(req.body.password, result.password)
        .then(function (result) {
          console.log(result);
          if (result) {
            res.status(200).json({
              status: true,
              message: "Successfully logged in",
              data: result,
            });
          } else {
            res.status(200).json({
              status: false,
              message: "Incorrect password",
            });
          }
        });
    }
  });
};

module.exports = {
  signIn,
  signUp,
  otpVerification,
};
