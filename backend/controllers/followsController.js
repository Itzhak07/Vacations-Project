var connection = require("../services/mysql");

class FollowsController {
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        follows.follow_id AS "FollowID",
        follows.vacation_id AS "VacationID",
        follows.user_id AS "UserID"
       FROM follows
      `,
        function(err, rows, fields) {
          if (err) reject(err);
          // resolve(JSON.stringify(rows));
          resolve(rows);
        }
      );
    });
  }

  static follow(req, res, next) {
    let userId = req.body.userId;
    let vacationId = req.body.vacationId;

    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO follows (follows.user_id, follows.vacation_id) 
         VALUES ("${userId}", "${vacationId}")`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }

  static unfollow(req, res, next) {
    let userId = req.body.userId;
    let vacationId = req.body.vacationId;

    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM follows 
      WHERE user_id = "${userId}" AND vacation_id = "${vacationId}";`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = FollowsController;
