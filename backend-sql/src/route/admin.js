const express=require("express")
const router=express.Router()
const authenticate=require("..//middileware/authonicate")
const {getExpense,getTask,getUser,getSalary}=require("..//controller/admin")
router.get("/getTask",authenticate,getTask)
router.get("/getUser",authenticate,getUser)
router.get("/getSalary",authenticate,getSalary)
router.get("/getExpense",authenticate,getExpense)

module.exports =router