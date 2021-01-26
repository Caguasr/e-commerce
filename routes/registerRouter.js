const express = require('express');
const { check } = require('express-validator');
const  RegisterController  = require('../controllers/registerController');


const router = express.Router();

router.post('/', 
[
    check('user', 'ingrese el usuario').notEmpty(),
    check('email', 'ingrese el email').notEmpty(),
    check('password', 'ingrese el password').notEmpty(),
    check('phone', 'ingrese el celular').notEmpty(),
],
RegisterController.registerUser);

module.exports = router ;