const router = require("express").Router();

const userRoutes = require("./user.js");
const profileRoutes = require("./profile");

// create a default route for /api
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Meshwork" });
});

router.use("/api/users", userRoutes);
router.use("/api/profile", userRoutes);

module.exports = router;
