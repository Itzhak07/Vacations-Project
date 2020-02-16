var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Itzhak07",
  database: "vacations_db",
  dateStrings: "date"
});

connection.connect();

module.exports = connection;
