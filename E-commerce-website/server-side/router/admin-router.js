const express = require("express");
const protect = require("../middleware/user-procet-middleware");
const admin = require("../middleware/Admin-middleware");
const router = express.Router();

router.post("/");

module.exports = router;
