const express=require("express")
const router=express.Router()
const authonicate=require("..//middileware/authonicate")
const {amountChain,descriptionChain}=require("..//util/valdation")
const {addExpense,addSalary,getExpense,getSalary,getDayExpense,getDaySalary,getMonthExpense,getMonthSalary,getYearExpense,getYearSalary}=require("..//controller/premium")

router.post("/addSalary",authonicate,amountChain(),descriptionChain(),addSalary)
router.post("/addExpense",authonicate,amountChain(),descriptionChain(),addExpense)
router.get("/getExpense",authonicate,getExpense)
router.get("/getSalary",authonicate,getSalary)
router.post("/getDaySalary",authonicate,getDaySalary)
router.post("/getMonthSalary",authonicate,getMonthSalary)
router.post("/getYearSalary",authonicate,getYearSalary)
router.post("/getDayExpense",authonicate,getDayExpense)
router.post("/getMonthExpense",authonicate,getMonthExpense)
router.post("/getYearExpense",authonicate,getYearExpense)

module.exports =router