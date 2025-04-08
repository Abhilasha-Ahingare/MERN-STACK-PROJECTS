const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const { createProduct, updateProduct } = require("../controllers/product-controller");
const admin = require("../middleware/Admin-middleware");

// Define routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);


module.exports = router;
