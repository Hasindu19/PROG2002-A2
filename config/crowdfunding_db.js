const mysql = require("mysql2");

//create a connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crowdfunding_db",
  port: "3306",
});

//To connect to the databse
connection.connect((err) => {
  if (err) throw err;
  console.log("Connection Successful!");
});
