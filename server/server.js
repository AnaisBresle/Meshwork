// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

<<<<<<< HEAD:server.js
const sequelize = require("./server/config/connection");
const routes = require("./server/routes");
=======
const sequelize = require('./config/connection');
const routes = require('./routes');
>>>>>>> be042367e0f9fd76e7eb7e75f7103cfad6d91283:server/server.js

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
<<<<<<< HEAD:server.js
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
=======
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
>>>>>>> be042367e0f9fd76e7eb7e75f7103cfad6d91283:server/server.js
});


<<<<<<< HEAD:server.js
// API routes
app.use("/api", routes);

// Fallback route for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});


// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
=======
// Sync database
sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
>>>>>>> be042367e0f9fd76e7eb7e75f7103cfad6d91283:server/server.js
});
