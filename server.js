// server.js
const express = require("express");
const sequelize = require("./config/crowdfunding_db"); // Import the Sequelize instance
const { Fundraiser, Category } = require("./models"); // Import models

const app = express();
app.use(express.json());

const port = 3000;

// Sync models and connect to the database
sequelize
  .sync({ force: false }) // { force: false } ensures tables aren't dropped
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => console.error("Database sync failed:", err));

// Example route: Retrieve all active fundraisers
app.get("/fundraisers", (req, res) => {
  Fundraiser.findAll({ where: { isActive: true } })
    .then((fundraisers) => res.json(fundraisers))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Database query failed", error: err.message })
    );
});

// Example route: Retrieve a specific fundraiser by ID
app.get("/fundraisers/:id", (req, res) => {
  const fundraiserId = req.params.id;
  Fundraiser.findByPk(fundraiserId)
    .then((fundraiser) => {
      if (!fundraiser) {
        return res.status(404).json({ message: "Fundraiser not found" });
      }
      res.json(fundraiser);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Database query failed", error: err.message })
    );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
