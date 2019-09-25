var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var UsersController = require("../controllers/usersController");
var jwt = require("jsonwebtoken");

/* GET ALL Users */
router.get("/", async (req, res, next) => {
  try {
    const rows = await UsersController.getAll();
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).render("error");
  }
});

//Login auth//
// router.post(
//   "/login",
//   [
//     check("username", "Username is Required")
//       .not()
//       .isEmpty(),
//     check(
//       "password",
//       "Please Enter a Password With 5 Or More Characters"
//     ).isLength({
//       min: 5
//     })
//   ],
//   async (req, res, next) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     let loginValidation = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(409).json({ errors: errors.array() });
//     } else {
//       try {
//         let checkLogin = await UsersController.getAll().then(users => {
//           users.filter(user => {
//             if (user.Username == username && user.Password == password) {
//               loginValidation = true;
//             }
//           });
//         });
//         res.send(loginValidation);
//       } catch (error) {
//         console.log(error);
//         res.status(409).send("login error ");
//       }
//     }
//   }
// );

//*Register New User To DB//
router.post(
  "/register",
  [
    check("fname", "First Name Is Required!")
      .not()
      .isEmpty(),
    check("lname", "Last Name Is Required!")
      .not()
      .isEmpty(),
    check("username", "Username is Required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please Enter a Password With 5 Or More Characters"
    ).isLength({
      min: 5
    })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    } else {
      try {
        let usernameCheck = req.body.username;
        let rows = await UsersController.checkUsername(usernameCheck);
        if (rows.length !== 0) {
          res
            .status(409)
            .json({ errors: [{ msg: "Username is already taken" }] });
        } else {
          rows = await UsersController.insertUser(req, res, next);
          console.log(rows);

          console.log("user ID: " + rows.insertId);

          const payload = {
            user: {
              id: rows.insertId
            }
          };

          jwt.sign(
            payload,
            "mysecrettoken",
            {
              expiresIn: 36000
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      } catch (error) {
        console.log(error);

        res.status(409).send("Username is already taken");
      }
    }
  }
);

//*GET single user //
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    const rows = await UsersController.getSingleUser(id);
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    // res.status(409).send("USER HAS NOT BEEN FOUND");
    res.status(409).render("error");
  }
});

module.exports = router;
