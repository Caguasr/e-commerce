const { validationResult } = require("express-validator");
const connection = require("../config/db");

exports.getAllProducts = (req, res) => {
  const sql = "SELECT * FROM productos;";
  connection.query(sql, (error, results, fields) => {
    res.status(202).json({ results, error });
  });
};

exports.saveOrder = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(202).json({ errors: errors.array() });
  }
  const { usuario, iva, subtotal, total, fecha, ubicacion, token } = req.body;
  const sql = `SELECT u.id_usuario FROM usuarios u where u.email="${usuario}";`;
  connection.query(sql, (error, results, fields) => {
    const id_usuario = results[0].id_usuario;
    const sql =
      "INSERT INTO `e-commerce`.`ventas` (`fecha`, `iva`, `subtotal`, `total`, `Usuariosid_usuario`, `ubicacion`) VALUES (" +
      `'${fecha}', '${iva}', '${subtotal}', '${total}', '${id_usuario}', '${ubicacion}');`;
    connection.query(sql, (error, results, fields) => {
      res.status(202).json({ results, error });
    });
  });
};

exports.saveDetail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(202).json({ errors: errors.array() });
    }
    const  {id_producto, id_order} = req.body;
    const sql =
      "INSERT INTO `e-commerce`.`detalle_ventas` (`productosid_productos`, `Ventasid_ventas`) VALUES" +
      ` ('${id_producto}', '${id_order}');`;
    connection.query(sql, (error, results, fields) => {
      res.status(202).json({ results, error });
    });
  }; 