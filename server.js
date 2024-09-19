// server.js
const express = require("express");
const connection = require("./config/crowdfunding_db"); // Import the database connection

const app = express();
app.use(express.json());

const port = 3000;

// Example route: Retrieve all active fundraisers
app.get("/fundraisers", (req, res) => {
  const query = "SELECT * FROM fundraisers WHERE isActive = 1";

  connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err.message });
    }
    res.json(results);
  });
});

// Example route: Retrieve a specific fundraiser by ID
app.get("/fundraisers/:id", (req, res) => {
  const fundraiserId = req.params.id;
  const query = "SELECT * FROM fundraisers WHERE id = ?";

  connection.query(query, [fundraiserId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }
    res.json(results[0]);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
