const express = require("express");
const protect = require("../middleware/user-procet-middleware");
const admin = require("../middleware/Admin-middleware");
const { getAllUser, UserAdminCreate, updateAdminUser, deleteAdminUser } = require("../controllers/admin-controllers");
const router = express.Router();

router.get("/user", protect, admin, getAllUser);
router.post("/user", protect, admin, UserAdminCreate);
router.put("/user/:id", protect, admin, updateAdminUser);
router.delete("/user/:id", protect, admin, deleteAdminUser);




module.exports = router;
