const express = require("express");
const { Event, EventAttendee, User } = require("../models");
const { authMiddleware } = require("../utils/auth");
const router = express.Router();

// Create event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List events
router.get("/", async (req, res) => {
  const events = await Event.findAll({ include: User });
  res.json(events);
});

// Get specific event with attendees
router.get("/:id", async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: [{ model: User, through: { attributes: ["status"] } }]
  });
  res.json(event);
});

module.exports = router;