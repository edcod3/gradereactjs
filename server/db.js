const mysql = require("mysql");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

function GetDomain () {
    if (process.env.NODE_ENV == "production") {
        var sess_domain = process.env.SESS_DOMAIN;
        var sess_opts = {
            maxAge: 1800000,
            httpOnly: true,
            sameSite: true,
            secure: true,
            domain: sess_domain
        };
    } else if (process.env.NODE_ENV == "reactdev") {
        var sess_domain = process.env.SESS_DOMAIN || "";
        var sess_opts = {
            maxAge: 1800000,
            httpOnly: true,
            sameSite: false,
            domain: sess_domain
        }
    } else {
        var sess_domain = process.env.SESS_DOMAIN || "";
        var sess_opts = {
            maxAge: 1800000,
            httpOnly: true,
            sameSite: true,
            domain: sess_domain
        };
    }
    return sess_opts;
}

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

module.exports.GetDomain = GetDomain();
module.exports.con_pool = conpool_mysql;
module.exports.sessionStore = sessionStore_mysql;