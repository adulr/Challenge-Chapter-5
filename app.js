const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const router = require("./src/routers");

// set view engine to ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

// init cookie parser
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static file public
app.use(express.static("./public"));
app.use(express.static("public"));

// user router
app.use(router);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});