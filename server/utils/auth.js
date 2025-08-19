const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY; // taken from .env
const expiration = "2h";


  // Middleware to authenticate requests using JWT
 
const authMiddleware = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  // Handle 'Bearer <token>' format
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: "Bearer Token not supplied or invalid" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch (err) {
    return res.status(400).json({ message: `Invalid token: ${err.message}` });
  }

  return req;
};

/**
 * Sign a JWT token for the given user
 * @param {Object} user - Sequelize user instance
 */
const signToken = (user) => {
  const payload = {
  id: user.id,
  email: user.email,
  firstname: user.firstname,
  lastname: user.lastname,
};

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
