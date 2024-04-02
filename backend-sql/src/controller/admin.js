const Task=require("..//module/task")
const User=require("..//module/user")
const Expense=require("..//module/expense")
const Salary=require("..//module/salary")
const { Sequelize } = require("sequelize")

const getTask=async(req,res)=>{
    try{
        const task=await Task.findAll({
            attributes:['UserId',[Sequelize.literal('User.name'),'userName'],
            [Sequelize.fn("SUM",Sequelize.col('price')),'total']],
            include:[
                {
                    model:User,
                    attributes:[],
                    required:true
                }
            ],
            group:["UserId"]
            
        })
        const allTask=await Task.findAll({
            include:{
                model:User,
                attributes:['name','email','isPremium','verifya'],
            }
        })
        return res.status(200).send({task,allTask})

    }
    catch(err){
       
        return res.status(500).send("Internal Server Error")
    }
}
const getUser=async (req,res)=>{
    try{
        const user=await User.findAll()
        return res.status(200).send(user)

    }
    catch(err){
        return res.status(500).send("Internal Server Error")
    }
}
const getSalary=async (req,res)=>{
    try{
        const salary=await Salary.findAll({
            include:{
                model:User,
                attributes:['name','email','isPremium','verifya']

            }
        })
        return res.status(200).send(salary)

    }
    catch(err){
        return res.status(500).send("Internal Server Error")

    }
}
const getExpense=async (req,res)=>{
    try{
        const expense=await Expense.findAll({
            include:{
                model:User,
                attributes:['name','email','isPremium','verifya']
            }
        })
        return res.status(200).send(expense)

    }
    catch(err){
        return res.status(500).send("Internal Server Error")
    }
}

module.exports ={getTask,getUser,getUser,getExpense,getSalary}