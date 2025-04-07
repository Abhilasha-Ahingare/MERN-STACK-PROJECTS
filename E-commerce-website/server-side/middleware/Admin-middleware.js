// const user = require("../model/user-model");

const admin = (req, res, next) => {
  console.log("user data", req.user);
  // Check if req.user is an array and get the first user
  const currentUser = Array.isArray(req.user) ? req.user[0] : req.user;

  if (currentUser && currentUser.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = admin;
