const express = require("express");
const router = express.Router();

const {
  registration,
  login,
  profile,
} = require("../controllers/user-controller");

const protect = require("../middleware/user-procet-middleware");

// Define routes
router.post("/registration", registration);
router.post("/login", login);

// protect midillware

router.get("/profile", protect, profile);

module.exports = router;
