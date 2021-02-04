const express = require("express");
const ProductController = require("../controllers/productController");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  [
    check("usuario", "No se ha encontrado el usuario").notEmpty(),
    check("iva", "No se ha encontrado el iva").notEmpty(),
    check("subtotal", "No se ha encontrado el subtotal").notEmpty(),
    check("ubicacion", "No se ha encontrado el ubicacion").notEmpty(),
    check("total", "No se ha encontrado el total").notEmpty(),
    check("fecha", "No se ha encontrado el fecha").notEmpty(),
    check("token", "No se ha encontrado el token").notEmpty(),
  ],
  ProductController.saveOrder
);


module.exports = router;
