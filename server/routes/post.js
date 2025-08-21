const express = require("express");
const { Post, Topic, User, Reaction } = require("../models");
const { authMiddleware } = require("../utils/auth"); // JWT authentication middleware - Needed to get post deleted by their owners only. 
const router = express.Router();



/// Get all top-level posts (parentId = null)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { parentId: null },
      include: [
        { model: User, as: "user", attributes: ["id", "username", "firstname", "lastname"] },
        { model: Topic, attributes: ["id", "name"] },
        { model: Post, as: "comments" },
        { model: Reaction }
      ],
      order: [["createdAt", "DESC"]]
   });

const formattedPosts = posts.map(post => ({
  ...post.toJSON(),
  created_date: post.createdAt.toISOString().split("T")[0] // YYYY-MM-DD
}));

res.json(formattedPosts);

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
        { model: User,  as: "user", attributes: ["id", "username", "firstname", "lastname"] },
        { model: Reaction }
      ],
      order: [["createdAt", "ASC"]],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/// Create a post
router.post("/",authMiddleware, async (req, res) => {
  try {
     const newPost = await Post.create({
      content: req.body.content,
      topicId: req.body.topicId || null, // if topic selected otherwise default to null value
      parentId: null, // set to null as this is not a comment but a top level post
      userId: req.user.id// from JWT
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
});


/// Add Commnent
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
     const comment = await Post.create({
      content: req.body.content,
      parentId: req.params.id, //need the id of the post which now becomes the parent id since we are created a comment. 
      userId: req.user.id// from JWT
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to post comment" });
  }
});



/// Delete post (broad sense) - only owner can 
router.delete("/:id", authMiddleware, async (req, res) => { ///checking post ide as this route is for deleted any type of post (aprent or comment)
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    //IMPORTANT!!!!!!!!!!!!!!! Check if the logged-in user is the owner
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorised to delete this post" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;