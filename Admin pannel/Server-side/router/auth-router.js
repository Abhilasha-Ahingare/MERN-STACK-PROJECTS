const express = require("express");
const router = express.Router();
const authControllers = require("../Controllers/auth-controller");

const { signupSchema, loginSchema } = require("../validation/auth-validation");

const validate = require("../Meddileware/validate-middleware");

const authMiddleware=require("../Meddileware/auth-meddileware")

router.get("/", authControllers.HomePage);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.Registration);

router.route("/login").post(validate(loginSchema), authControllers.LoginFrom);

router.route("/user").get(authMiddleware, authControllers.User);

module.exports = router;
