const sequelize = require("sequelize");

const dbConnection = new sequelize("db_club", "root", "cdfvagps", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = dbConnection;