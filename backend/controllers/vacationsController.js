var connection = require("../services/mysql");
var FollowsController = require("./followsController");
const fs = require("fs");

class VacationsController {
  //Get all users//
  static getAll() {
    let vacations = [];
    let follows = [];
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        vacations.vacation_id AS "VacationID",
        vacations.destination AS "Destination",
        vacations.description AS "Description",
        vacations.fromDate AS "From",
        vacations.toDate AS "To",
        vacations.price AS "Price",
        vacations.image AS "ImageName"
       FROM vacations
      `,
        async function(err, rows, fields) {
          if (err) reject(err);

          try {
            vacations = rows;
            follows = await FollowsController.getAll();
            vacations.forEach(vacation => {
              vacation.FollowsCount = 0;
              vacation.Follows = [];

              follows.forEach(follow => {
                if (follow.VacationID == vacation.VacationID) {
                  vacation.Follows.push(follow);
                  vacation.FollowsCount = vacation.Follows.length;
                }
              });
            });
          } catch (err) {
            reject(err);
          }
          resolve(vacations);
        }
      );
    });
  }

  // Insert new vacation to DB//
  static insertVacation(body, file) {
    let { destination, description, fromDate, toDate, price } = body;

    let image = file.filename;

    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO vacations (vacations.destination, vacations.description, vacations.fromDate, vacations.toDate, vacations.price, vacations.image) 
         VALUES ("${destination}","${description}", "${fromDate}",  "${toDate}", "${price}","${image}" )`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve({
            VacationID: rows.insertId,
            Destination: destination,
            Description: description,
            From: fromDate,
            To: toDate,
            Price: price,
            ImageName: image,
            Follows: [],
            FollowsCount: 0
          });
        }
      );
    });
  }

  static async updateVacation(body, file, req) {
    let { destination, description, fromDate, toDate, price, id } = body;

    const thisVacation = await VacationsController.getSingleVacation(id);

    console.log(file);
    console.log(thisVacation.ImageName);

    return new Promise((resolve, reject) => {
      if (typeof file === "undefined") {
        connection.query(
          `UPDATE vacations
          SET vacations.destination = '${destination}', vacations.description = '${description}', vacations.fromDate= '${fromDate}', vacations.toDate = '${toDate}', vacations.price='${price}'
          WHERE vacation_id = "${id}"`,
          function(err, rows, fields) {
            if (err) reject(err);
            resolve(VacationsController.getAll());
          }
        );
      } else {
        let image = file.filename;
        let currentImagePath = `./uploads/${thisVacation.ImageName}`;
        if (image !== currentImagePath) {
          fs.unlinkSync(currentImagePath);
        }

        connection.query(
          `UPDATE vacations
          SET vacations.destination = '${destination}', vacations.description = '${description}', vacations.fromDate= '${fromDate}', vacations.toDate = '${toDate}', vacations.price='${price}', vacations.image='${image}'
          WHERE vacation_id = "${id}"`,
          function(err, rows, fields) {
            if (err) reject(err);
            resolve(VacationsController.getAll());
          }
        );
      }
    });
  }

  //Get Single Vacation and The Followers//
  static getSingleVacation(id) {
    // let id = req.body.id;
    let vacations;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        vacations.vacation_id AS "VacationID",
        vacations.destination AS "Destination",
        vacations.description AS "Description",
        vacations.fromDate AS "From",
        vacations.toDate AS "To",
        vacations.price AS "Price",
        vacations.image AS "ImageName"
 
        FROM vacations
       
         WHERE vacations.vacation_id = ${id} `,
        function(err, rows, fields) {
          if (err) reject(err);
          else {
            vacations = rows[0];
            connection.query(
              `SELECT
              users.user_id AS "UserID",
              users.fname AS "FirstName",
              users.lname AS "LastName",
              users.username AS "Username",
              users.password AS "Password",
              users.role AS "Role"
              FROM users
              INNER JOIN follows on users.user_id = follows.user_id
              WHERE follows.vacation_id = ${id}`,
              function(err, rows, fields) {
                if (err || vacations == null) reject(err);
                else {
                  vacations.Followers = rows;
                  resolve(vacations);
                }
              }
            );
          }
        }
      );
    });
  }

  static deleteVacation(req, res, next) {
    let id = req.params.id;
    // const thisVacation = await VacationsController.getSingleVacation(id);
    VacationsController.deleteImagefromDB(id);
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE vacations, follows 
      FROM vacations 
      LEFT JOIN follows ON vacations.vacation_id = follows.vacation_id
      WHERE vacations.vacation_id = "${id}"`,
        function(err, rows, fields) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }

  static async deleteImagefromDB(id) {
    try {
      const thisVacation = await VacationsController.getSingleVacation(id);
      const imgPath = `./uploads/${thisVacation.ImageName}`;
      fs.unlinkSync(imgPath);
    } catch (err) {
      return err;
    }
  }
}

module.exports = VacationsController;
