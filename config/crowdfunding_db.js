const mysql = require("mysql2");

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add password if needed
  database: "crowdfunding_db",
  port: 3306,
});

// Test the connection to ensure it's working
connection.connect((err) => {
  if (err) {
    console.error("Unable to connect to the database:", err);
  } else {
    console.log(
      "Connection to the database has been established successfully."
    );
  }
});

// Export the connection for use elsewhere in the app
module.exports = connection;
