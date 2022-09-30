const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'uu7o2mz6',
        database: 'organization'
    }
);

module.exports = db;