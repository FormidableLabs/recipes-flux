// Patch require
require("node-jsx").install({ extension: ".jsx" });

// Server
var path = require("path");
var express = require("express");
var compress = require("compression");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

// DB
var db = require("../db/db");

var app = express();
var PORT = process.env.PORT || 3000;

// ----------------------------------------------------------------------------
// CORS
// ----------------------------------------------------------------------------

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());
app.use(bodyParser());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "../templates"));

// ----------------------------------------------------------------------------
// Static Routes
// ----------------------------------------------------------------------------
app.use("/app/js-dist/*.map", function (req, res) {
  res.send(404, "404"); // Prevent sourcemap serving.
});
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/app/css-dist", express.static("app/css-dist"));

// ----------------------------------------------------------------------------
// API
// ----------------------------------------------------------------------------
// TODO: Example wrapper.
// var _errOrData = function (res, dataOverride) {
//   return function (err, data) {
//     if (err) {
//       return res.status(500).json({ error: err.message || err.toString() });
//     }

//     res.json(dataOverride || data);
//   };
// };

// TODO: Old REST route using wrapper.
// app["delete"]("/api/notes/:id", function (req, res) {
//   db.run("delete from notes where id=?", req.params.id, _errOrData(res, {}));
// });

// ----------------------------------------------------------------------------
// Dynamic Routes
// ----------------------------------------------------------------------------
app.get("/", function (req, res) {
  return res.render("index", {});
});

// ----------------------------------------------------------------------------
// Recipes crud
// ----------------------------------------------------------------------------

app.get("/recipes", function (req, res) {
  return res.json(db.getRecipes());
});

app.get("/recipes/get/:id", function (req, res) {
  return res.json(db.getRecipe(req.params.id));
});

app.post("/recipes/create", function (req, res) {
  return res.json(db.createRecipe(req.body.recipe));
});

app.put("/recipes/update", function (req, res) {
  return res.json(db.updateRecipe(req.body.recipe));
});

app.delete("/recipes/delete", function (req, res) {
  return res.json(db.deleteRecipe(req.body._id));
});

// ----------------------------------------------------------------------------
// Start
// ----------------------------------------------------------------------------
var start = function (opts, callback) {
  callback = callback || function () {};
  opts = opts || {};
  opts.port = opts.port || PORT;
  app.listen(opts.port, callback);
};

module.exports = {
  start: start
};

// Script. Use defaults (init dev. database).
if (require.main === module) {
  start();
}
