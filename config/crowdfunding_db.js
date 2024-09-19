const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for your MySQL database
const sequelize = new Sequelize("crowdfunding_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
});

// Test the connection to ensure it's working
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize; // Export the Sequelize instance
