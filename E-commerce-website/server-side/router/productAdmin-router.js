const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const admin = require("../middleware/Admin-middleware");
const {
  getAllAdminProducts,
} = require("../controllers/productAdmin-controller");




router.get("/", protect, admin, getAllAdminProducts);

module.exports = router;
