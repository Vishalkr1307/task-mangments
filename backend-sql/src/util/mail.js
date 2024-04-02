const nodemailer=require("nodemailer")
const Mailgen=require("mailgen")
const OtpSchema=require("..//module/otp")
const UserSchema=require("..//module/user")
require("dotenv").config()

module.exports =async(email)=>{
  

    const transport = await nodemailer.createTransport({
        service:"gmail",
        host:'smtp.gmail.com',
        auth:{
            user:process.env.GMAIL_EMAIL,
            pass:process.env.GMAIL_PASSWORD
        }
    })
    const user=await UserSchema.findOne({
        where:{
            email:email
        }
    })
    if(!user){
        return new Error ("User not found")
    }
    const otp=Math.round(1000+Math.random()*9000).toString()
    const Otp=await OtpSchema.create({
        userId:user.id,
        otp:otp,
        createdAt:Date.now(),
        expiredAt:Date.now()+1000*60*3

    })
    await Otp.save()
    var mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: process.env.URL,
        },
      });
    
      var email = {
        body: {
          name: user.name,
          intro:
            "Welcome to expense-mangment! We're very excited to have you on board.",
          action: {
            instructions: "To get started with Mailgen, please click here:",
            button: {
              color: "#22BC66", 
              text: otp,
            },
          },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      };
      var emailBody = mailGenerator.generate(email);
      var emailText = mailGenerator.generatePlaintext(email)
      const info=await transport.sendMail({
        from:process.env.GMAIL_EMAIL,
        to:user.email,
        subject:"Otp verification",
        html:emailBody,
        text:emailText
      })
      if(info.messageId){
        return {status:`Otp sent your email ${user.email}`,userId:Otp.userId,email:user.email,expiredAt:Otp.expiredAt}
      }
    
    

}