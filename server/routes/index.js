const router = require("express").Router();

const userRoutes = require("./user.js");
const profileRoutes = require("./profile.js");
const postRoutes = require("./post.js");
const topicRoutes = require("./topic.js");
const interactionRoutes = require("./interaction.js");
const eventRoutes = require("./event.js");
const eventAttendeeRoutes = require("./eventAttendee.js");

// default /api route
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Meshwork" });
});

// user-related routes
router.use("/api/users", userRoutes);
// profile-related routes
router.use("/api/profile", profileRoutes); 
router.use("/api/posts", postRoutes);
router.use("/api/topics", topicRoutes);
router.use("/api/interactions", interactionRoutes);
router.use("/api/events", eventRoutes);
router.use("/api/attendees", eventAttendeeRoutes);

module.exports = router;
