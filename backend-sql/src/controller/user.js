const { validationResult } = require("express-validator");
const { formatOferror } = require("..//util/valdation");
const User = require("..//module/user");
const OtpSchema=require("..//module/otp")
const bcrypt = require("bcrypt");
const { newToken } = require("..//util/token");
const sentMail = require("..//util/mail");

const Register = async (req, res) => {
  try {
    const error = validationResult(req);
    console.log(error)
    if (!error.isEmpty()) {
      return res.status(404).send(formatOferror(error.array()).join(","));
    }

    const user = await User.create(req.body);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
const Login = async (req, res) => {
  try {
    let user = req.user;

    if (!user) {
      return res.status(500).send("user not found ");
    }
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!matchPassword) {
      return res.status(400).send("password does not match");
    }
    const mail = await sentMail(user.email);
    return res.status(200).send(mail);
  } catch (err) {
    

    return res.status(500).send("internal server error");
  }
};
const OtpVerification=async (req,res)=>{
    try{
        const id = req.params.id;
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOferror(error.array()).join(","));

        }
        const user=await OtpSchema.findAll({
            where:{
                userId: id,
            }
        })
        
        if(user.length==0){
            return res.status(400).send("User not found")

        }
        const {otp,expiredAt}=user[user.length-1]
        
        if(new Date(expiredAt).getTime()<new Date().getTime()){
            await OtpSchema.destroy({
                where:{
                    userId:id
                }
            })
            return res.status(400).send("Your otp has expired")
        }
        else{
            const matchOtp=bcrypt.compareSync(req.body.otp,otp)
            if(!matchOtp){
                return res.status(400).send("Your otp has wrong")
            }
            await OtpSchema.destroy({
                where:{
                    userId:id
                }
            })
            await User.update({verifya:true},{
                where:{
                    id:id,
                }
            })
            const updateUser=await User.findOne({
                where:{
                    id:id,
                }
            })
            
            const token=newToken(updateUser)
            return res.status(200).send({status:"Your Otp have successfully verified",token})

            

        }
        

    }
    catch(err){
        return res.status(500).send("internal server error")
    }
}
const ForgetPassword=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOferror(error.array()).join(","));

        }
        let user=req.user
        
        if(!user){
            return res.status(401).send("User not found")
        }
        const sendData=await sentMail(user.email)

        return res.status(200).send(sendData)


    }
    catch(err){
        return res.status(500).send("internal server error")
    }
}
const ResetPassword =async (req, res) =>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOferror(error.array()).join(","));

        }
        const id=req.params.id
        await User.update({password:req.body.password},{
            where:{
                id:id,
            }
        })
        return res.status(200).send({status:"Yor password successfully updated"})


    }
    catch(err){
        return res.status(500).send("internal server error")
    }

}
const ResendOtp=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findOne({
            where:{
                id:id,
            }
        })
        const sendData=await sentMail(user.email)
        return res.status(200).send(sendData)

    }
    catch(err){
        return res.status(500).send("internal server error")
    }
}
module.exports = { Register, Login,OtpVerification,ForgetPassword,ResetPassword,ResendOtp };
