const connection = require('../config/db')

exports.getAllProducts = (req, res) => {

    const sql = 'SELECT * FROM productos;'
    connection.query(sql, (error, results, fields) => {
        res.status(202).json({results, error})
    });
}