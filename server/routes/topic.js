const express = require("express");
const { Topic, Post } = require("../models");
const router = express.Router();

// Create topic
router.post("/", async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List topics
router.get("/", async (req, res) => {
  const topics = await Topic.findAll();
  res.json(topics);
});

// Get topic with posts under this topci
router.get("/:id", async (req, res) => {
  const topic = await Topic.findByPk(req.params.id, { include: Post });
  res.json(topic);
});

module.exports = router;
