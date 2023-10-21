var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studentsApiRouter = require("./rest_controller/student");
var intentionalErrorRouter = require("./routes/throwError");

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/students", studentsApiRouter);
app.use("/error", intentionalErrorRouter);

// because 404 is thrown by express
// we will handle our defined error first
app.use(function (req, res, next) {
  if (req.statusCode === 400) {
    res.status(400);
    res.send("400 BAD REQUEST !");
    return;
  } else if (req.statusCode === 403) {
    res.status(403);
    res.send("403 NOT AUTHORIZED !");
    return;
  } else if (req.statusCode === 500) {
    res.status(500);
    res.send("500 INTERNAL SERVER ERROR !");
    return;
  }
  res.status(404);
  res.send("404 NOT FOUND !");
});

// ---------- error handler below will be use when the project is under development------------
// ---------- this is just for testing purposes so the error handler is simple ---------------

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
