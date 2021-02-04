const { validationResult } = require("express-validator");
const connection = require("../config/db");

exports.getOrdersByUsuer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(202).json({ errors: errors.array() });
  }
  const { email } = req.body;
  const sql = `select * from ventas ve where ve.Usuariosid_usuario=(select id_usuario from usuarios usu where usu.email="${email}");`;
  connection.query(sql, (error, results, fields) => {
    res.status(202).json({ results, error });
  });
};

exports.getDeteailByIdOrder = (req, res) => {
  const  value  = req.params.value;
  const sql = `select * from productos pro, detalle_ventas dv where pro.id_productos=dv.productosid_productos and dv.Ventasid_ventas=${parseInt(value)}`;
  connection.query(sql, (error, results, fields) => {
    res.status(202).json({ results, error });
  });
};
