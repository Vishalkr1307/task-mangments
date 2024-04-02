const Salary = require("..//module/salary");
const Expense = require("..//module/expense");
const { validationResult } = require("express-validator");
const { formatOferror } = require("..//util/valdation");
const { Sequelize } = require("sequelize");

const addSalary = async (req, res) => {
  try {
    const user = req.user;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOferror(error.array()).join(","));
    }
    const salary = await Salary.create({ ...req.body, UserId: user.id });
    return res.status(200).send(salary);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const addExpense = async (req, res) => {
  try {
    const user = req.user;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(formatOferror(error.array()).join(","));
    }
    const expense = await Expense.create({ ...req.body, UserId: user.id });
    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getSalary = async (req, res) => {
  try {
    const user = req.user;
    const salary = await Salary.findAll({
      where: {
        UserId: user.id,
      },
    });
    return res.status(200).send(salary);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getExpense = async (req, res) => {
  try {
    const user = req.user;
    const expense = await Expense.findAll({
      where: {
        UserId: user.id,
      },
    });
    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getDayExpense = async (req, res) => {
  try {
    const { date } = req.body;
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const user = req.user;

    const expense = await Expense.findAll({
      where: {
        date: {
          [Sequelize.Op.and]: [
            Sequelize.literal(`YEAR(date) = ${year}`),
            Sequelize.literal(`MONTH(date) = ${month}`),
            Sequelize.literal(`DAY(date) = ${day}`),
          ],
        },
        UserId: user.id,
      },
    });
    if (expense.length == 0) {
      return res.status(400).send("Date is not Available for this date");
    }

    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getMonthExpense = async (req, res) => {
  try {
    const { date } = req.body;
    const user = req.user;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const expense = await Expense.findAll({
      where: {
        date: {
          [Sequelize.Op.and]: [
            Sequelize.literal(`YEAR(date) = ${year}`),
            Sequelize.literal(`MONTH(date) = ${month}`),
          ]
        },
        UserId: user.id,
      },
    });
    if (expense.length == 0) {
      return res.status(400).send("data is not available for this month");
    }
    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getYearExpense = async (req, res) => {
  try {
    const { date } = req.body;
    const user=req.user;
    
    const year = new Date(date).getFullYear();
    const expense = await Expense.findAll({
      where: {
        date:{
          [Sequelize.Op.and]:[Sequelize.literal(`YEAR(date)=${year}`)]
        },
        UserId:user.id
      }
    });
    if(expense.length==0){
      return res.status(400).send("Date not Available for this year")
    }
    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getDaySalary = async (req, res) => {
  try {
    const { date } = req.body;
    const user = req.user;
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth()+1;
    const year = new Date(date).getFullYear();
    const salary = await Salary.findAll({
      where: {
        
        date:{
          [Sequelize.Op.and]:[Sequelize.literal(`YEAR(date)=${year}`),Sequelize.literal(`MONTH(date)=${month}`),Sequelize.literal(`DAY(date)=${day}`)]
        },
        userId: user.id,
      },
    });
    if(salary.length==0){
      return res.status(400).send("Data is not Available fot this Date")
    }

    return res.status(200).send(salary);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getMonthSalary = async (req, res) => {
  try {
    const { date } = req.body;
    const user = req.user;
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const salary = await Salary.findAll({
      where: {
        date:{
          [Sequelize.Op.and]:[Sequelize.literal(`YEAR(date)=${year}`),Sequelize.literal(`MONTH(date)=${month}`)]

        },
        userId: user.id,
      },
    });
    if(salary.length==0){
      return res.status(400).send("Data is not Available for this month")
    }

    return res.status(200).send(salary);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
const getYearSalary = async (req, res) => {
  try {
    const { date } = req.body;
    const user=req.user
    const year = new Date(date).getFullYear();
    const salary = await Salary.findAll({
      where: {
        date:{
          [Sequelize.Op.and]:[Sequelize.literal(`YEAR(date)=${year}`)]
        },
        userId: user.id,
      },
    });
    if(salary.length==0){
      return res.status(400).send("Data is not Available for this year")
    }

    return res.status(200).send(salary);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addSalary,
  addExpense,
  getExpense,
  getSalary,
  getDayExpense,
  getMonthExpense,
  getYearExpense,
  getDaySalary,
  getYearSalary,
  getMonthSalary,
};
