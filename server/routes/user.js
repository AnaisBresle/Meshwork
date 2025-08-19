const router = require("express").Router();
const { User, Post } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// =======================
// SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;


    // Validate required fields
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    // Generate JWT token
    const token = signToken(newUser);

    // Remove password before sending response
    const userSafe = newUser.get({ plain: true });
    delete userSafe.password;

    res.status(201).json({ token, user: userSafe });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Update lastLogin timestamp
    await userData.update({ lastLogin: new Date() });

    const token = signToken(userData);

    const userSafe = userData.get({ plain: true });
    delete userSafe.password;

    res.status(200).json({ token, user: userSafe });
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({ message: "Login failed", error: err.message });
  }
});

// =======================
// LOGOUT (JWT – client deletes token)
// =======================
router.post("/logout", authMiddleware, (req, res) => {
  res.status(204).end();
});

// =======================
// GET Current User
// =======================
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
    console.error("Get current user error:", err);
    res.status(500).json(err);
  }
});

// =======================
// CREATE a Post
// =======================
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
    console.error("Create post error:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

module.exports = router;
