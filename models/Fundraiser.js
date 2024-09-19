// models/Fundraiser.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/crowdfunding_db"); // Import the Sequelize instance

const Fundraiser = sequelize.define(
  "Fundraiser",
  {
    // Changed id to FUNDRAISER_ID
    FUNDRAISER_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ORGANIZER: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CAPTION: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TARGET_FUNDING: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CURRENT_FUNDING: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    CITY: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ACTIVE: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    CATEGORY_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: "CATEGORY", // Refers to the 'CATEGORY' table
        key: "CATEGORY_ID", // Adjust the key if needed
      },
    },
  },
  {
    tableName: "FUNDRAISER", // Specify the table name in the DB
    timestamps: false, // Disable automatic timestamps if not needed
  }
);

module.exports = Fundraiser;
