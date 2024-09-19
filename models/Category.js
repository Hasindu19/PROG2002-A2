// models/Category.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/crowdfunding_db"); // Import the Sequelize instance

const Category = sequelize.define(
  "Category",
  {
    // Changed id to CATEGORY_ID
    CATEGORY_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "CATEGORY", // Specify the table name in the DB
    timestamps: false, // Disable automatic timestamps if not needed
  }
);

module.exports = Category;
