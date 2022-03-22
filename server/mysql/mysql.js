const mysql = require('mysql')

const connectionMysql = mysql.createConnection({
    host: 'localhost',
    database: 'telegram',
    user: 'root',
    password: 'toor'
})

module.exports = connectionMysql