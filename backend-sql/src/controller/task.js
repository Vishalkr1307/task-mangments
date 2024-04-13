const Task = require("..//module/task");
const { validationResult } = require("express-validator");
const { formatOferror } = require("..//util/valdation");
const User=require("..//module/task")

const addTask = async (req, res) => {
  try {
    const user = req.user;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOferror(error.array()).join(","));
    }
    const task=await Task.create({...req.body,UserId:user.id})
    
    return res.status(200).send(task)
  } catch (err) {
    
    return res.status(500).send("internal server error");
  }
};
const getTask=async(req,res)=>{
    try{
        const user=req.user
        const task=await Task.findAll({
            where:{
                UserId:user.id
            }
            
            
        })
        return res.status(200).send(task)

    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error");

    }
}
const singleTask=async (req,res)=>{
    try{
        const user=req.user
        const task=await Task.findOne({
            where:{
                UserId:user.id,
                id:req.params.id
            }
        })
        if(!task){
            return res.status(400).send("task not found");
        }
        return res.status(200).send(task)

    }
    catch(err){
        return res.status(500).send("internal server error");
    }
}
const updateTask=async (req,res)=>{
    try{
        const user=req.user
        await Task.update(req.body,{
            where:{
                id:req.params.id,
                UserId:user.id
            }
        })
        return res.status(200).send("Task updated successfully")

    }
    catch(err){
        return res.status(500).send("internal server error")
    }
}
const deleteTask=async (req,res)=>{
    try{
        const user=req.user
        await Task.destroy({
            where:{
                UserId: user.id,
                id: req.params.id

            }
        })
        return res.status(200).send("Task deleted successfully")

    }
    catch(err){
        // console.log(err)
        return res.status(500).send("internal server error")
    }
}

module.exports = { addTask,getTask,updateTask,singleTask,deleteTask };
