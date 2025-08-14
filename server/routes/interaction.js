const express = require("express");
const { Interaction } = require("../models");
const router = express.Router();

// Like or celebrate... a post
router.post("/", async (req, res) => {
  try {
    const interaction = await Interaction.create({
      userId: req.user.id, // who does the interaction
      postId: req.body.postId, // on which post
      interactionType: req.body.interactionType
    });
    res.json(interaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove interaction
router.delete("/:id", async (req, res) => {
  const interaction = await Interaction.findByPk(req.params.id);
  if (!interaction) return res.status(404).json({ error: "Not found" });
  await interaction.destroy();
  res.json({ message: "Removed" });
});

module.exports = router;
