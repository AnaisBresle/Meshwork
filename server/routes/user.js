const router = require("express").Router();
const { User, Post } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// SIGNUP

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const newUser = await User.create({ first_name, last_name, email, password });

    // Generate JWT token
    const token = signToken(newUser);

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
});


// LOGIN

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = signToken(userData);
    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Login failed", error: err.message });
  }
});


// LOGOUT (JWT — client deletes token)

router.post("/logout", authMiddleware, (req, res) => {
  res.status(204).end();
});


// GET Current User

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// CREATE a Post

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

module.exports = router;
