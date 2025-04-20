const express = require("express");

const router = express.Router();

const AllUserData = require("../Controllers/admin-controllers");

const authMiddleware = require("../Meddileware/auth-meddileware");
const adminMiddleware = require("../Meddileware/admin-meddileware");


//user data
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, AllUserData.getAllUsers);

  router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, AllUserData.SingleUser);

  router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, AllUserData.UpdateUser);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, AllUserData.deleteUser);


//conact

router
  .route("/contact")
  .get(authMiddleware, adminMiddleware, AllUserData.getAllContact);

  router
  .route("/contact/delete/:id")
  .delete(authMiddleware, adminMiddleware, AllUserData.deleteContact);

router
  .route("/service")
  .get(authMiddleware, adminMiddleware, AllUserData.getAllService);

module.exports = router;
