const express = require("express");
const { EventAttendee } = require("../models");
const router = express.Router();

// Register for event
router.post("/", async (req, res) => {
  try {
    const attendee = await EventAttendee.create({
      eventId: req.body.eventId,
      userId: req.user.id,
      status: "registered"
    });
    res.json(attendee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update attendance status
router.put("/:id", async (req, res) => {
  const attendee = await EventAttendee.findByPk(req.params.id);
  if (!attendee) return res.status(404).json({ error: "Not found" });
  await attendee.update({ status: req.body.status });
  res.json(attendee);
});

module.exports = router;
