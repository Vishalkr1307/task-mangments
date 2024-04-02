const {DataTypes}=require("sequelize")
const db=require("..//config/db")
const Salary=db.define("Salary",{
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
    totalSalary:{
        type:DataTypes.INTEGER,
    }

})
Salary.beforeCreate(async (salary,options)=>{
    try{
        const UserId=salary.UserId
        const data=await Salary.findAll({
            where:{
                UserId:UserId
            }
        })
        const totalSalary=data.reduce((current,item)=>current+item.amount,0)
        salary.setDataValue("totalSalary",totalSalary==0?salary.amount:totalSalary+salary.amount)

    }
    catch(err){
        throw new Error("internal server error")
    }
})

module.exports=Salary