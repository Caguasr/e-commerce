const express = require("express");
const ProductController = require("../controllers/productController");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/",
  [
    check("id_producto", "No hay id del prodcuto").notEmpty(),
    check("id_order", "No hay id del order").notEmpty(),
  ],
  ProductController.saveDetail
);

module.exports = router;
