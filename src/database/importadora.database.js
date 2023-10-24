const config = require( "../config")
const  mysql = require( "mysql2/promise")

const connection = mysql.createConnection({
    host: config.HOST,
    database: config.DATABASE,
    user: config.USER,
    password: config.PASSWORD,
    port: config.PORT
})


const getConnection = () => {
    return connection
}

module.exports = {
    getConnection
}