const express = require('express');
const ProductController = require('../controllers/productController')

const router = express.Router();


router.get('/', ProductController.getAllProducts);


module.exports = router;