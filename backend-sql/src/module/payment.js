const {DataTypes}=require("sequelize")
const db=require("../config/db")

const Payment=db.define("Payment",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    paymentId:{
        type:DataTypes.STRING,
    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false
    }

})
module.exports = Payment