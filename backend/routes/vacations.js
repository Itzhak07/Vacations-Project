var express = require("express");
var router = express.Router();
var VacationsController = require("../controllers/vacationsController");
const upload = require("../services/multer");

////* GET users listing. *////
router.get("/", async (req, res, next) => {
  try {
    const rows = await VacationsController.getAll();

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("ERROR IN GETTING ALL VACATIONS");
  }
});

////*POST New Vacation to DB////

router.post("/", upload, async (req, res, next) => {
  try {
    let { body, file } = req;
    console.log(body);
    console.log(file);

    const rows = await VacationsController.insertVacation(body, file);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("ERROR IN POSTING VACATION");
  }
});

////PUT Update Vacation////
router.put("/update/:id", upload, async (req, res, next) => {
  try {
    let { body, file } = req;
    const rows = await VacationsController.updateVacation(body, file, req);
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("ERROR IN UPDATING VACATION INFO");
  }
});

////*DELETE Vacation////
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const rows = await VacationsController.deleteVacation(req, res, next);
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("ERROR IN DELETING VACATION");
  }
});

////*GET single Vacation////

router.get("/single", async (req, res, next) => {
  try {
    const rows = await VacationsController.getSingleVacation(req, res, next);
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.log(error);

    res.status(409).send("VACATION HAS NOT BEEN FOUND");
  }
});

module.exports = router;
