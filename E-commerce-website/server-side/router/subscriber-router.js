const express = require("express");
const { subscription } = require("../controllers/subscriber-controllers");
const router = express.Router();

router.post("/", subscription);

module.exports = router;
