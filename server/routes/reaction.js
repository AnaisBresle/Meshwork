const express = require("express");
const { Reaction } = require("../models");
const router = express.Router();

// Like or celebrate... a post
router.post("/", async (req, res) => {
  try {
    const reaction = await Reaction.create({
      userId: req.user.id, // who does the interaction
      postId: req.body.postId, // on which post
      reactionType: req.body.reactionType
    });
    res.json(reaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove reaction
router.delete("/:id", async (req, res) => {
  const reaction = await Reaction.findByPk(req.params.id);
  if (!reaction) return res.status(404).json({ error: "Not found" });
  await reaction.destroy();
  res.json({ message: "Removed" });
});

module.exports = router;
