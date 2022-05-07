const mysql = require('mysql')

const connectionMysql = mysql.createConnection({
    host: 'localhost',
    database: 'message_db',
    user: 'root',
    password: 'toor'
})

module.exports = connectionMysql