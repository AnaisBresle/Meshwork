const router = require("express").Router();

const userRoutes = require("./user.js");
const profileRoutes = require("./profile");

// default /api route
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Meshwork" });
});

// user-related routes
router.use("/api/users", userRoutes);

// profile-related routes
router.use("/api/profile", profileRoutes);

module.exports = router;
