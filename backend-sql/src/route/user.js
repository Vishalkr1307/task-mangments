const express = require("express");
const router = express.Router();
const User = require("..//module/user");
const passport = require("..//config/passport");

const {
  nameChain,
  emailChain,
  passwordChain,
  loginChain,
  otpChain,
} = require("..//util/valdation");
const {
  Register,
  Login,
  OtpVerification,
  ForgetPassword,
  ResetPassword,
  ResendOtp,
} = require("..//controller/user");
passport.serializeUser(function ({ user, token }, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user);
  });
});

router.post("/register", nameChain(), emailChain(), passwordChain(), Register);
router.post("/login", loginChain(), Login);
router.post("/forgetpassword", loginChain(), ForgetPassword);
router.post(
  "/forgetpassword/resetpassword/:id",
  passwordChain(),
  ResetPassword
);
router.post("/otpverification/:id", otpChain(), OtpVerification);
router.post("/resendotp/:id", ResendOtp);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    const {user,token}=req.user
    res.status(200).send({user,token})
  }
);

module.exports = router;
