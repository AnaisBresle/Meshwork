const router = require("express").Router();
const { User, Profile, Post } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");
const { Sequelize, Op } = require('sequelize');
const bcrypt = require("bcrypt");


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
   const { firstname, lastname, username, email, password } = req.body;
  
    // Basic validation
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    if (password.length < 8) {
  throw new Error("Password must be at least 8 characters");
}
    // Check if email already exists
 const existingUser = await User.findOne({ where: { email } });
  
if (existingUser) {
  return res.status(400).json({ message: "Email already registered" });
}

 // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword

    });

     // Return only safe data
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
      },
    });

  
  } catch (err) {
     console.log("Signup error:", err);
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email },
    include: [{ model: Profile, attributes: ["picture"] }] // include profile pic 
    });

    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Update lastLogin timestamp
    await userData.update({ lastLogin: new Date() });

    const token = signToken(userData);

    // Remove password before sending response
    const userSafe = userData.get({ plain: true });
    delete userSafe.password;

    res.status(200).json({ token, user: userSafe });

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
      include: [{ model: Post },
       { model: Profile, attributes: ["picture"] }
      ],
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
