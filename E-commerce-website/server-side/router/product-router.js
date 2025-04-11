const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  sortProducts,
  singleProduct,
  similarProduct,
  BestSeller,
  NewArrivals,
} = require("../controllers/product-controller");

const admin = require("../middleware/Admin-middleware");

// Define routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/", sortProducts);
router.get("/new-arrivals", NewArrivals);
router.get("/BestSeller", BestSeller);
router.get("/similar/:id", similarProduct);
router.get("/:id", singleProduct);

module.exports = router;
