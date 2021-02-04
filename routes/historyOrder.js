const express = require("express");
const HistoryController = require("../controllers/historyController");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "No hay id del email").notEmpty(),
    check("token", "No hay id del token").notEmpty(),
  ],
  HistoryController.getOrdersByUsuer
);
router.get("/:value", HistoryController.getDeteailByIdOrder);

module.exports = router;
