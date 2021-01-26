const { validationResult } = require("express-validator");
const connection = require("../config/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config({path: '.env'});
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(202).json({ errors: errors.array() });
  }
  const { email, user, password, phone } = req.body;
  connection.query(
    `SELECT * FROM usuarios usu where usu.email="${email}"`,
    (error, results, fields) => {
      const response = results.length;
      if (response > 0) {
        return res.status(202).json({ msg: "Ya existe el usuario" });
      }
      bcryptjs.genSalt(10).then((salt) =>
        bcryptjs.hash(password, salt).then((newPassword) => {
          connection.query(
            "INSERT INTO usuarios (`nombre`, `telefono`, `email`, `password`) VALUES" +
              ` ("${user}",${phone},"${email}","${newPassword}");`,
            (erros, results, fields) => {
              if (results) {
                const payload = {
                  user: {
                    user,
                    email,
                    phone,
                  },
                };
                jwt.sign(
                  payload,
                  process.env.SECRET_PASSWORD,
                  {
                    expiresIn: "365d",
                  },
                  (error, token) => {
                    if (error) throw error;

                    return res
                      .status(202)
                      .json({
                        msg: "Usuario creado con exito",
                        results: results,
                        token,
                      });
                  }
                );
              } else {
                return res
                  .status(202)
                  .json({ msg: "Algo salio mal intentalo de nuevo" });
              }
            }
          );
          /* return res.status(202).json({ msg: "Usuario creado correctamente" }); */
        })
      );
    }
  );
};
