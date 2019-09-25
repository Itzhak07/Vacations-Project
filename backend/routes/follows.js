var express = require("express");
var router = express.Router();
var FollowsController = require("../controllers/followsController");

// Get All Follows
router.get("/", async (req, res, next) => {
  try {
    const rows = await FollowsController.getAll();
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).render("FOLLOW ERROR");
  }
});

/* POST new follow */
router.post("/", async (req, res, next) => {
  try {
    const rows = await FollowsController.follow(req, res, next);
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).render("FOLLOW ERROR");
  }
});

//* DELETE follow //

router.delete("/", async (req, res, next) => {
  try {
    const rows = await FollowsController.unfollow(req, res, next);
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("UNFOLLOW ERROR");
  }
});

module.exports = router;
