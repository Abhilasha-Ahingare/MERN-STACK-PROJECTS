const express = require("express");
const router = express.Router();
const contactControllers = require("../Controllers/contact-controller");

router.route("/contact").post(contactControllers);

module.exports = router;
