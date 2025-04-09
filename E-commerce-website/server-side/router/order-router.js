const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const { MyOrders, OrderDetails } = require("../controllers/Order-controllers");

router.get("/myorder", protect, MyOrders);
router.get("/:id", protect, OrderDetails);


module.exports = router;
