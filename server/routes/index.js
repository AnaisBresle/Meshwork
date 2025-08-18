const router = require("express").Router();

const userRoutes = require("./user.js");
const profileRoutes = require("./profile.js");
<<<<<<< HEAD
=======
const postRoutes = require("./post.js");
const topicRoutes = require("./topic.js");
const reactionRoutes = require("./reaction.js");
const eventRoutes = require("./event.js");
const eventAttendeeRoutes = require("./eventAttendee.js");
>>>>>>> be042367e0f9fd76e7eb7e75f7103cfad6d91283

// Default API route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Meshwork API" });
});

<<<<<<< HEAD
// User-related routes
router.use("/users", userRoutes);

// Profile-related routes
router.use("/profile", profileRoutes);
=======
// user-related routes
router.use("/api/users", userRoutes);
// profile-related routes
router.use("/api/profiles", profileRoutes); 
router.use("/api/posts", postRoutes);
router.use("/api/topics", topicRoutes);
router.use("/api/reactions", reactionRoutes);
router.use("/api/events", eventRoutes);
router.use("/api/attendees", eventAttendeeRoutes);
>>>>>>> be042367e0f9fd76e7eb7e75f7103cfad6d91283

module.exports = router;
