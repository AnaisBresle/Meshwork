const express = require("express");
const { Post, Topic, User, Interaction } = require("../models");
const { authMiddleware } = require("../middleware/auth"); // JWT authentication middleware - Needed to get post deleted by their owners only. 
const router = express.Router();


/// Get all top-level posts (parentId = null)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { parentId: null },
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Topic, attributes: ["id", "name"] },
        { model: Interaction }
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/// Get all comments for a given post

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Post.findAll({
      where: { parentId: req.params.id }, /// only postst that are in fact comments will have a parentId
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Interaction }
      ],
      order: [["createdAt", "ASC"]],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;