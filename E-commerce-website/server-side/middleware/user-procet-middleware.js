const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

// middleware to protect routes

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findOne(decoded.user.id);
      if (!user) {
        return res.status(401).json({
          message: "User not found or deleted",
        });
      }

      req.User = user;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({
        message: "Not authorized, token verification failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = protect;
