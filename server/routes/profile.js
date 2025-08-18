const express = require("express");
const { Profile, User } = require("../models");
const router = express.Router();

// Create Profile
router.post("/", async (req, res) => {
  try {
    const profile = await Profile.create({ ...req.body, userId: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all profiles -Needed for direcctory
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.findAll({ 
      
      include: {
        model: User,
        attributes: ["firstname", "lastname", "email"] 
      },
    });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Profile by User ID
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.params.userId }, include: User });
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: "Profile not found" });
  }
});

// Update Profile
router.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: "Not found" });
    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;