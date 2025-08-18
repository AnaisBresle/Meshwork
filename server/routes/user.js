const router = require("express").Router();
const { User, Post } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");
const crypto = require("crypto");
const { Op } = require("sequelize");

// --- SIGNUP ---
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      email,
      password
    });

    const token = signToken(newUser);

    const userSafe = newUser.get({ plain: true });
    delete userSafe.password;

    res.status(201).json({ token, user: userSafe });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });
    if (!userData) return res.status(400).json({ message: "Incorrect email or password" });

    const validPassword = await userData.checkPassword(password);
    if (!validPassword) return res.status(400).json({ message: "Incorrect email or password" });

    const token = signToken(userData);
    const userSafe = userData.get({ plain: true });
    delete userSafe.password;

    res.status(200).json({ token, user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Login failed", error: err.message });
  }
});

// --- FORGOT PASSWORD ---
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    await user.update({ resetToken, resetTokenExpiry });

    // In production, send via email (using nodemailer). For now:
    console.log(`Password reset link: http://localhost:3000/reset-password/${resetToken}`);

    res.json({ message: "Password reset link generated", resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- RESET PASSWORD ---
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await user.update({
      password: newPassword,
      resetToken: null,
      resetTokenExpiry: null
    });

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// --- LOGOUT ---
router.post("/logout", authMiddleware, (req, res) => {
  res.status(204).end();
});

// --- GET CURRENT USER ---
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// --- CREATE A POST ---
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content are required" });

    const newPost = await Post.create({ title, content, userId: req.user.id });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

module.exports = router;
