const express = require("express");
const router = express.Router();
const protect = require("../middleware/user-procet-middleware");
const admin = require("../middleware/Admin-middleware");
const { getAllOrder, updateAdminOrderDetails, deleteAdminOrder } = require("../controllers/adminOrder-controller");

router.get("/", protect, admin, getAllOrder);
router.put("/:id", protect, admin, updateAdminOrderDetails);
router.delete("/:id", protect, admin, deleteAdminOrder);



module.exports = router;
