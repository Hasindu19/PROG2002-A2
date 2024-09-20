const express = require("express");
const cors = require("cors"); // Add CORS middleware
const sequelize = require("./config/crowdfunding_db"); // Import the Sequelize instance
const { Fundraiser, Category } = require("./models"); // Import models
const { Op } = require("sequelize"); // Import Sequelize Op for search queries

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const port = 3000;

// Sync models and connect to the database
sequelize
  .sync({ force: false }) // { force: false } ensures tables aren't dropped
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => console.error("Database sync failed:", err));

// Retrieve all active fundraisers including the category
app.get("/fundraisers", async (req, res) => {
  try {
    const fundraisers = await Fundraiser.findAll({
      where: { ACTIVE: true }, // Only active fundraisers
      include: {
        model: Category,
        attributes: ["NAME"], // Include only the category name
      },
    });
    res.status(200).json(fundraisers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundraisers", error: err.message });
  }
});

// Retrieve all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve categories", error: err.message });
  }
});
app.get("/search", async (req, res) => {
  const { categoryId, city, organizer, minGoal, maxGoal } = req.query; // Include organizer
  const searchCriteria = {
    ACTIVE: true,
  };

  // Add search criteria
  if (categoryId) {
    searchCriteria.CATEGORY_ID = categoryId.split(","); // Handle multiple categories
  }
  if (city) searchCriteria.CITY = city;
  if (organizer) searchCriteria.ORGANIZER = organizer; // Include organizer criteria
  if (minGoal && maxGoal) {
    searchCriteria.TARGET_FUNDING = {
      [Op.between]: [minGoal, maxGoal],
    };
  } else if (minGoal) {
    searchCriteria.TARGET_FUNDING = { [Op.gte]: minGoal };
  } else if (maxGoal) {
    searchCriteria.TARGET_FUNDING = { [Op.lte]: maxGoal };
  }

  try {
    const fundraisers = await Fundraiser.findAll({
      where: searchCriteria,
      include: {
        model: Category,
        attributes: ["NAME"],
      },
    });
    res.status(200).json(fundraisers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundraisers", error: err.message });
  }
});

// Retrieve fundraiser details by ID
app.get("/fundraiser/:id", async (req, res) => {
  const fundraiserId = req.params.id;

  try {
    const fundraiser = await Fundraiser.findOne({
      where: { FUNDRAISER_ID: fundraiserId },
      include: {
        model: Category,
        attributes: ["NAME"], // Include category name
      },
    });

    if (!fundraiser) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }

    res.status(200).json(fundraiser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundraiser", error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
