const express = require("express");
const cors = require("cors"); // Add CORS middleware
const { Fundraiser, Category } = require("./models"); // Import models
const { Op } = require("sequelize"); // Import Sequelize Op for search queries
const pool = require("./config/crowdfunding_db"); // Adjust this path to where your pool is defined

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const port = 3000;

app.get("/fundraisers", async (req, res) => {
  try {
    const [fundraisers] = await pool.query(`
      SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, 
             f.CURRENT_FUNDING, f.CITY, f.IMAGE_URL, c.NAME as categoryName
      FROM FUNDRAISER f
      JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.ACTIVE = 1
    `);
    res.status(200).json(fundraisers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundraisers", error: err.message });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT * FROM CATEGORY
    `);
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve categories", error: err.message });
  }
});

app.get("/search", async (req, res) => {
  const { categoryId, city, organizer, minGoal, maxGoal } = req.query;

  // Start building the base SQL query
  let query = `
    SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, 
           f.CURRENT_FUNDING, f.CITY, f.IMAGE_URL, c.NAME as categoryName
    FROM FUNDRAISER f
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
    WHERE f.ACTIVE = 1
  `;

  // Array to store query parameters for prepared statement
  const queryParams = [];

  // Add search criteria to the query dynamically
  if (categoryId) {
    const categories = categoryId.split(",");
    query += ` AND f.CATEGORY_ID IN (${categories.map(() => "?").join(",")}) `;
    queryParams.push(...categories);
  }

  if (city) {
    query += ` AND f.CITY = ? `;
    queryParams.push(city);
  }

  if (organizer) {
    query += ` AND f.ORGANIZER = ? `;
    queryParams.push(organizer);
  }

  if (minGoal && maxGoal) {
    query += ` AND f.TARGET_FUNDING BETWEEN ? AND ? `;
    queryParams.push(minGoal, maxGoal);
  } else if (minGoal) {
    query += ` AND f.TARGET_FUNDING >= ? `;
    queryParams.push(minGoal);
  } else if (maxGoal) {
    query += ` AND f.TARGET_FUNDING <= ? `;
    queryParams.push(maxGoal);
  }

  try {
    const [fundraisers] = await pool.query(query, queryParams);
    res.status(200).json(fundraisers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundraisers", error: err.message });
  }
});

app.get("/fundraiser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [fundraiser] = await pool.query(
      `
      SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, 
             f.CURRENT_FUNDING, f.CITY, f.IMAGE_URL, c.NAME as categoryName
      FROM FUNDRAISER f
      JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.FUNDRAISER_ID = ? AND f.ACTIVE = 1
    `,
      [id]
    );

    if (fundraiser.length === 0) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }

    res.status(200).json(fundraiser[0]);
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
