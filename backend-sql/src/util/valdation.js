const formatOferror = (errorOfArray) => {
  return errorOfArray.map((err) => err.msg);
};

const User = require("..//module/user");
const { body } = require("express-validator");

const emailChain = () =>
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email is required")
    .custom(async (val, { req, res }) => {
      const user = await User.findOne({
        where: {
          email: val,
        },
      });
      if (user) {
        throw new Error("Email is already in use");
      }
    });
const nameChain = () =>
  body("name").notEmpty().isString().withMessage("it must be a string");
const passwordChain = () =>
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters")
    .custom(async (val) => {
      for (var i = 0; i < val.length; i++) {
        if (val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 || val.charCodeAt(0) >=48 && val.charCodeAt(0) <=57){
          throw new Error("First character must Be Uppercase");
        }
      }
    });

const loginChain = () =>
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email is required")
    .custom(async (val,{req}) => {
      let user = await User.findOne({
        where: {
          email: val,
        },
      });

      if (!user) {
        throw new Error("user not found");
      }
      
      req.user=user;
    });

const otpChain=()=>body("otp").notEmpty().isString().isLength({min:4,max:4}).withMessage("Otp have 4 digit")
const titleChain=()=>body("title").notEmpty().withMessage("title not empty").isString("title must be a string")
const priceChain=()=>body("price").notEmpty().withMessage("price must not be empty").isNumeric().custom(async(val)=>{
    if(val<0){
        throw new Error ("price must be greater than zero")
    }
})
const amountChain=()=>body("amount").notEmpty().withMessage("price must not be empty").isNumeric().custom(async(val)=>{
    if(val<0){
        throw new Error ("price must be greater than zero")
    }
})
const descriptionChain=()=>body("description").notEmpty().isString().withMessage("Description must be a string")

module.exports = {
  emailChain,
  nameChain,
  passwordChain,
  formatOferror,
  loginChain,
  otpChain,
  titleChain,
  priceChain,
  descriptionChain,
  amountChain
};
