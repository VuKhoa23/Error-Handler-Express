var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({
    message: "Return all students",
  });
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  res.send({
    message: `Return student with ${id}`,
  });
});

router.post("/", function (req, res, next) {
  theStudent = req.body;
  theStudent.message = "This is a create";

  res.send(theStudent);
});

router.put("/", function (req, res, next) {
  theStudent = req.body;
  theStudent.message = "This is a update";
  console.log(theStudent);
  res.send(theStudent);
});

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;

  res.send({
    message: `Delete student with ${id}`,
  });
});

module.exports = router;
