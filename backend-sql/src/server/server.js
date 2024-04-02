const app=require("..//index")
const db=require("..//config/db")
const TaskSchema=require("..//module/task")
const UserSchema=require("..//module/user")
const PaymentSchema=require("../module/payment")
const SalarySchema=require("..//module/salary")
const ExpenseSchema=require("..//module/expense")
require("dotenv").config()

const port=process.env.PORT||8000
UserSchema.hasMany(TaskSchema)
TaskSchema.belongsTo(UserSchema)
UserSchema.hasMany(PaymentSchema)
PaymentSchema.belongsTo(UserSchema)
UserSchema.hasMany(SalarySchema)
SalarySchema.belongsTo(UserSchema)
UserSchema.hasMany(ExpenseSchema)
ExpenseSchema.belongsTo(UserSchema)

db.sync({force:false}).then((res)=>{
    console.log("Connect to database")
    app.listen(port,async ()=>{
        console.log(`listening on ${port}`)
    })

}).catch((err)=>{
    console.log(err)
})





