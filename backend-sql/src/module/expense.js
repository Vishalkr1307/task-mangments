const {DataTypes}=require("sequelize")
const db=require("..//config/db")
const Expense=db.define("Expense",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false

    },
    totalExpense:{
        type:DataTypes.INTEGER,
    }

})
Expense.beforeCreate(async (expense,options)=>{
    try{
        const UserId=expense.UserId
        const data=await Expense.findAll({
            where:{
                UserId:UserId
            }
        })
        const totalExpense=data.reduce((current,item)=>current+item.amount,0)
        expense.setDataValue("totalExpense",totalExpense==0?expense.amount:totalExpense+expense.amount)

    }
    catch(err){
        throw new Error("internal server error")
    }
})

module.exports=Expense