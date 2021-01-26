const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const connection = require("../config/db");
const crypt = require('bcryptjs');
require('dotenv').config({path: '.env'});



exports.getUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(202).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    connection.query(
      `SELECT * FROM usuarios usu where usu.email="${email}"`,
      (error, results, fields) => {
        const response = results.length;
        if (response < 1) {
          return res
            .status(202)
            .json({ msg: "Usuario y/o contraseña incorrecta" });
        }
         crypt.compare(password, results[0].password).then(verify => {

          if (!verify) {
            return res
            .status(202)
            .json({ msg: "Usuario y/o contraseña incorrecta" });
          }

          const payload = {
            user: {
              user: results[0].nombre,
              email: results[0].email,
              phone: results[0].telefono
            }
          }

          jwt.sign(payload, process.env.SECRET_PASSWORD,{
            expiresIn: '365d'
          }, (error, token) => {
            if (error) throw error
            return res.status(202).json({token, session: payload.user})
          })

        });
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: "Algo salio mal intentalo mas tarde" });
  }
};
