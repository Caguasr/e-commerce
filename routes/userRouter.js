const express = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "ingrese el email").notEmpty(),
    check("password", "ingrese el password").notEmpty(),
  ],
  UserController.getUser
);

module.exports = router;
