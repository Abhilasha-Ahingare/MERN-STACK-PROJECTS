const express = require("express");
const protect = require("../middleware/user-procet-middleware");
const {
  cartItem,
  CartPut,
  CartDelete,
  GetCart,
  MergeCart,
} = require("../controllers/cart-contoller");

const router = express.Router();
router.post("/", cartItem);
router.post("/merge-cart", protect, MergeCart);
router.put("/", CartPut);
router.delete("/", CartDelete);
router.get("/", GetCart);

module.exports = router;
