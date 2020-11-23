require("newrelic");
const express = require("express");
const swig = require("swig");
const path = require("path");
const morgan = require("morgan");

// const { loggerMiddleware, errorLoggerMiddleware } = require('./winston');
const logger = require("./winston");

const app = express();

// Set swig as the template engine
app.engine("swig", swig.renderFile);
app.set("view engine", "swig");

app.set("views", path.join(__dirname, "views"));
app.set("view cache", false);
swig.setDefaults({ cache: false });

// app.use(loggerMiddleware);

app.use(morgan("combined", { stream: morgan.stream }));

app.route("/").get((req, res) => {
  logger.info("all good");
  res.render("index");
});

app.route("/error").get((req, res) => {
  res.render("index");
  logger.fatal("my fatal error");
  // res.render('invalid-template');
  // console.log(object);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.use(errorLoggerMiddleware);

app.listen(8080);

console.log("MEAN.JS application started on port", 8080);
