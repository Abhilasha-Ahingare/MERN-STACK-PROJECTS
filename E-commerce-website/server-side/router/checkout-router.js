const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const { CheckoutItem, checkoutPay, checkoutFinalize } = require("../controllers/Checkout-controllers");

router.post("/", protect, CheckoutItem);
router.put("/:id/pay", protect, checkoutPay);
router.post("/:id/finalized", protect, checkoutFinalize);



module.exports = router;
