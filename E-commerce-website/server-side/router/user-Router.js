const express = require("express");
const router = express.Router();
const { registration } = require("../controllers/user-controller");

// Define routes
router.post("/registration", registration);

module.exports = router;
