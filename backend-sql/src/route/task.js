const express=require("express")
const router=express.Router()
const {titleChain,priceChain,descriptionChain}=require("..//util/valdation")
const authonicate=require("..//middileware/authonicate")
const {addTask,getTask,updateTask,singleTask,deleteTask}=require("..//controller/task")

router.post("/addTask",authonicate,titleChain(),priceChain(),descriptionChain(),addTask)
router.get("/getTask",authonicate,getTask)
router.get("/singleTask/:id",authonicate,singleTask)
router.put("/updateTask/:id",authonicate,updateTask)
router.delete("/deleteTask/:id",authonicate,deleteTask)


module.exports=router
