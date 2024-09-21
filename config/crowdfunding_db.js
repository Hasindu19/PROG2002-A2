const mysql = require("mysql2/promise");

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Add password if needed
  database: "crowdfunding_db",
  port: 3306,
});

// Test the connection to ensure it's working
pool
  .getConnection()
  .then((connection) => {
    console.log(
      "Connection to the database has been established successfully."
    );
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = pool; // Export the pool for use elsewhere in the app
