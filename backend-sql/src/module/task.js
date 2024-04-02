const { DataTypes } = require("sequelize");
const db = require("..//config/db");

const Task = db.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["food", "petrol", "salary"]],
    },
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
Task.beforeCreate(async (task,options)=>{
    try{
        const UserId=task.UserId
        const totalTask=await Task.findAll({
            where:{
                UserId: UserId
            }
        })
        let totalPrice=totalTask.reduce((current,item)=>current+item.price,0)
        task.setDataValue("totalPrice",totalPrice==0?task.price:totalPrice+task.price)

    }
    catch(err){
        throw new Error("bad request")
    }

})
module.exports = Task;
