const { DataTypes } = require("sequelize");
const db = require("..//config/db");
const bcrypt = require("bcrypt");
const Otp = db.define("Otp", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue("otp", bcrypt.hashSync(val, 8));
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Otp;
