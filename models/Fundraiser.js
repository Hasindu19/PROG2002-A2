const { DataTypes } = require("sequelize");
const sequelize = require("../config/crowdfunding_db");

const Fundraiser = sequelize.define(
  "Fundraiser",
  {
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
        model: "CATEGORY",
        key: "CATEGORY_ID",
      },
    },
    IMAGE_URL: {
      // New field for image URL
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  },
  {
    tableName: "FUNDRAISER",
    timestamps: false,
  }
);

module.exports = Fundraiser;
