// Import required packages
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const sequelize = require('./config/connection');
const routes = require('./routes');


// Initialize Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for any paths from the client
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 3001;

// has the --rebuild parameter been passed as a command line param?
const rebuild = process.argv[2] === "--rebuild";

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client/public")));


// Handle GET request at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

// Add routes
app.use(routes);

// Sync database
sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
});
