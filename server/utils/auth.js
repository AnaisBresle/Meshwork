const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "supersecret";
const expiration = "2h";

module.exports = {
  signToken: function ({ id, username, email }) {
    const payload = { id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function (req, res, next) {
    let token = req.headers.authorization || "";

    if (token.startsWith("Bearer ")) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
};
