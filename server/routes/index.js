const router = require("express").Router();

const userRoutes = require("./user.js");
const profileRoutes = require("./profile.js");

// Default API route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Meshwork API" });
});

// User-related routes
router.use("/users", userRoutes);

// Profile-related routes
router.use("/profile", profileRoutes);

module.exports = router;
