// server.js
const express = require("express");
const app = express();
const port = 3000;

// Define a simple API endpoint
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Node.js API!", data: [1, 2, 3, 4, 5] });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
