var connection = require("../services/mysql");
const bcrypt = require("bcrypt");

class UsersController {
  //Get all users//
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        users.user_id AS "UserID",
        users.fname AS "FirstName",
        users.lname AS "LastName", 
        users.username AS "Username",
        users.password AS "Password",
        users.role AS "Role"
       FROM users
       ORDER BY users.user_id`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }

  //Check If User Exist Function
  static checkUsername(username) {
    // let isExist = false;
    let userData = [];
    let errorMsg = "Username is already taken";
    console.log("Username: " + username);
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE users.username = '${username}' LIMIT 1`,
        function(error, results) {
          console.log(results);

          if (results.length !== 0) {
            results.filter(user => {
              if (user.username == username) {
                // isExist = true;
                userData = user;
              }
            });
            resolve(userData);
          }
          resolve(userData);
        }
      );
    });
  }

  //Register new user to DB//
  static async insertUser(req, res, next) {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let username = req.body.username;
    let password = req.body.password;
    let role = "User";

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO users (fname, lname, username, password, role)
                       VALUES ("${firstName}", "${lastName}", "${username}", "${password}",
                               "${role}" )`,
        function(err, rows, fields) {
          if (err) reject(err);

          resolve(rows);
        }
      );
    });
  }

  //Get Single User and his follows//
  static getSingleUser(id) {
    // let id = req.params.id;
    let users;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
          users.user_id AS "UserID",
          users.fname AS "FirstName",
          users.lname AS "LastName",
          users.username AS "Username",
       
          users.role AS "Role",
          COUNT(follows.user_id) AS "FollowsCount"
         FROM users
         LEFT JOIN follows on users.user_id=follows.user_id
         WHERE users.user_id ='${id}' `,
        function(err, rows, fields) {
          if (err) throw err;
          users = rows[0];
          connection.query(
            `SELECT 
              vacations.vacation_id AS "VacationID",
              vacations.destination  AS "Destination",
              vacations.fromDate AS "From",
              vacations.toDate AS "To",
              vacations.description AS "Description",
              vacations.price AS "Price",
              vacations.image AS "ImageURL"
              FROM vacations
              INNER JOIN follows on vacations.vacation_id = follows.vacation_id
              WHERE follows.user_id = '${id}'`,
            function(err, rows, fields) {
              if (err || users.UserID == null) reject(err);
              users.Follows = rows;
              resolve(users);
            }
          );
        }
      );
    });
  }

  //Delete User from USERS and FOLLOWS and decrease the follows count from VacationsDB
  static deleteUser(req, res, next) {
    let id = req.params.id;

    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE users, follows 
      FROM users 
      LEFT JOIN follows ON users.user_id = follows.user_id
      WHERE users.user_id = "${id}"`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }

  //Update User Info
  static updateUser(req, res, next) {
    let id = req.params.id;
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let username = req.body.username;
    let password = req.body.password;

    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE users
        SET fname = '${firstName}', lname= '${lastName}', username = '${username}', password='${password}'
        WHERE user_id = "${id}"`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = UsersController;
