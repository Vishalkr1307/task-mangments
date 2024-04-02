const {Sequelize}=require("sequelize")

const db=new Sequelize('todo','root','Vishal@1307',{
    host: 'localhost',
    dialect:'mysql',
})

module.exports =db