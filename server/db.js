const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

//Create Connection Pool
var mysqlHost = process.env.MYSQL_HOST;
var mysqlPort = process.env.MYSQL_PORT;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPass = process.env.MYSQL_PASS;
var mysqlDB = process.env.MYSQL_DB;
var conpool_mysql = mysql.createPool({
	connectionLimit: 20,
	host: mysqlHost,
	port: mysqlPort,
	user: mysqlUser,
	password: mysqlPass,
	database: mysqlDB
});

var sessStore_opts = {
	clearExpired: true,
	checkExpirationInterval: 900000,
	expiration: 3600000,
	createDatabaseTable: true
};
var sessionStore_mysql = new MySQLStore(sessStore_opts, conpool_mysql);

module.exports.con_pool = conpool_mysql;
module.exports.sessionStore = sessionStore_mysql;
