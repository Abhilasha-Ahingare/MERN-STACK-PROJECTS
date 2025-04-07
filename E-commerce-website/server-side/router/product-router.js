const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const { createProduct } = require("../controllers/product-controller");
const admin = require("../middleware/Admin-middleware");

// Define routes
router.post("/", protect, admin, createProduct);

module.exports = router;
