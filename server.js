require("dotenv").config();
const express = require("express");
const { getDatabase } = require("./noition"); // Assuming the getDatabase function is defined in notion.js

const app = express();

app.use(express.static(__dirname)); // Serving static files for the client-side

// Route to fetch Notion database
app.get("/api/database", async function(req, res) {
  try {
    const databaseData = await getDatabase(); // Fetch data from Notion
    res.json({ data: databaseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
