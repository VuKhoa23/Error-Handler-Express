var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const Student = require("../models/studentModel");

const gender = ["male", "female"];

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async function (req, res, next) {
  try {
    const allStudents = await Student.find({});
    res.status(200).send(allStudents);
    return;
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});

router.get("/:sid", async function (req, res, next) {
  try {
    const { sid } = req.params;
    const student = await Student.findOne({ sid: sid }).exec();
    if (!student) {
      res.status(404).send("Student not found");
      return;
    } else {
      res.status(200).send(student);
      return;
    }
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});

router.post("/", async function (req, res, next) {
  try {
    if (!gender.includes(req.body.gender)) {
      res.status(400).send("Gender must be 'male' or 'female'");
      return;
    }

    const sid = req.body.sid;
    const student = await Student.findOne({ sid: sid }).exec();
    if (student) {
      res.status(400).send("Student already exists - Duplicated student id");
      return;
    } else {
      const savedStudent = await Student.create(req.body);
      res.status(200).send(savedStudent);
      return;
    }
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});

router.put("/", async function (req, res, next) {
  try {
    if (!gender.includes(req.body.gender)) {
      res.status(400).send("Gender must be 'male' or 'female'");
      return;
    }

    const sid = req.body.sid;
    const student = await Student.findOne({ sid: sid }).exec();
    if (!student) {
      res.status(400).send("Student with this ID doesn't exists");
      return;
    }

    const updated = await Student.findOneAndUpdate(
      { sid: sid },
      { name: req.body.name, gender: req.body.gender, class: req.body.class }
    );
    const result = await Student.findOne({ sid: sid }).exec();
    res.status(200).send(result);
    return;
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});

router.delete("/:sid", async function (req, res, next) {
  try {
    const { sid } = req.params;
    const student = await Student.findOne({ sid: sid }).exec();
    if (!student) {
      res.status(400).send("Student with this ID doesn't exists");
      return;
    } else {
      const deleted = await Student.deleteOne({ sid: sid }).exec();
      res.status(200).send(deleted);
      return;
    }
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});

module.exports = router;
