const mysql = require('mysql');


const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e-commerce'
});

connection.connect((error) => {
    if(error) throw console.log(error);

    console.log('DB CONNECT SUCCESS')
});

module.exports = connection;