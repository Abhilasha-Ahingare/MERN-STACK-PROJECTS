const express = require("express");
const router = express.Router();
const service = require("../Controllers/services-controller");

router.route("/service").get(service);

module.exports = router;
