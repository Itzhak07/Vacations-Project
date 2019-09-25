var express = require("express");
var router = express.Router();
var UsersController = require("../controllers/usersController");
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth-mw");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

/* GET ALL Users */
router.get("/", auth, async (req, res) => {
  try {
    const user = await UsersController.getSingleUser(req.user.id);
    console.log("user from auth is " + JSON.stringify(user));

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//Login auth//
router.post(
  "/login",
  [
    check("username", "Username is Required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    } else {
      const { username, password } = req.body;

      try {
        let rows = await UsersController.checkUsername(username);
        console.log(rows);

        if (!rows) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User has not been found" }] });
        }

        const isMatch = await bcrypt.compare(password, rows.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
          user: {
            id: rows.user_id
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
        // res.send("User has been submitted");
      } catch (error) {
        res.status(409).json({ errors: [{ msg: "User has not been found" }] });
      }
    }
  }
);

module.exports = router;
