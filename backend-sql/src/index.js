const express=require("express")
const app = express()

const fs=require("fs")
const path=require("path")
const morgan=require("morgan")
const helmet=require("helmet")
const session=require("express-session")
const cors=require("cors")
const User=require("./route/user")
const Task=require("./route/task")
const Payment=require("./route/payment")
const Premium=require("./route/premium")
const Admin=require('./route/admin')

const accesslog=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(express.json())
app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.use("/auth",User)
app.use("/task",Task)
app.use("/payment",Payment)
app.use("/premium",Premium)
app.use("/admin",Admin)

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://checkout.razorpay.com"],
        
      },

}))
app.use(morgan('combined',{stream:accesslog}))
app.get("/",(req,res)=>{
    res.send("Welcome to backend holi")
})



module.exports =app