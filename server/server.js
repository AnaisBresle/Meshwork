// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const sequelize = require("./config/connection");
const routes = require("./routes");



const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from client/public
app.use(express.static(path.join(__dirname, "../client/public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});


// Sync database
sequelize.sync({ force: false })  // or true if you want to reset DB
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

