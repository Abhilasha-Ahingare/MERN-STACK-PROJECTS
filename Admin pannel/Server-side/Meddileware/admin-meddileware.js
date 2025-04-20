const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const adminRole = req.user.isAdmin;
    // console.log(req.user.isAdmin);
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin" });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = adminMiddleware;
