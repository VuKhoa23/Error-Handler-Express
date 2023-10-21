var express = require("express");
var router = express.Router();

router.get("/400", function (req, res, next) {
  req.statusCode = 400;
  next();
});

router.get("/403", function (req, res, next) {
  req.statusCode = 403;
  next();
});

router.get("/404", function (req, res, next) {
  req.statusCode = 404;
  next();
});

router.get("/500", function (req, res, next) {
  req.statusCode = 500;
  next();
});

module.exports = router;
