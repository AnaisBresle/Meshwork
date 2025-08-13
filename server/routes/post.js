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


/// Create a post
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id, // from JWT
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
});



/// Add Commnent

/// Delete post (broad sense) - only owner can 

module.exports = router;