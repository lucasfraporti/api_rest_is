const mysql = require('mysql2');
var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": "root",
    "password": "",
    "database" : "teste",
    "host": "localhost",
    "port": 3306
});

exports.pool = pool;