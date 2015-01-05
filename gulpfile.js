/**
 * Gulpfile
 */
var fs = require("fs");
var _ = require("lodash");
var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var nodemon = require("gulp-nodemon");
var connect = require("gulp-connect");
var webpack = require("webpack");
var rimraf = require("gulp-rimraf");

var buildCfg = require("./webpack.config");

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
// Strip comments from JsHint JSON files (naive).
var _jsonCfg = function (name) {
  var raw = fs.readFileSync(name).toString();
  return JSON.parse(raw.replace(/\/\/.*\n/g, ""));
};

// ----------------------------------------------------------------------------
// JsHint
// ----------------------------------------------------------------------------
gulp.task("jshint:client", function () {
  gulp
    .src([
      "client/**/*.{js,jsx}"
    ])
    .pipe(jshint(_jsonCfg(".jshint-frontend.json")))
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("jshint:backend", function () {
  gulp
    .src([
      "scripts/**/*.js",
      "server/**/*.js",
      "test/**/*.js",
      "*.js"
    ])
    .pipe(jshint(_jsonCfg(".jshint-backend.json")))
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("jshint", ["jshint:client", "jshint:backend"]);

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("check",      ["jshint"]);
gulp.task("check:ci",   ["jshint"]);
gulp.task("check:all",  ["jshint"]);

// ----------------------------------------------------------------------------
// Builders
// ----------------------------------------------------------------------------
// Create webpack task.
var _webpack = function (cfg, pluginExcludes, pluginExtras) {
  // Filter plugins by constructor name.
  if (pluginExcludes) {
    cfg = _.extend({}, cfg, {
      plugins: _.reject(cfg.plugins, function (plugin) {
        return _.indexOf(pluginExcludes, plugin.constructor.name) !== -1;
      })
    });
  }

  // Now add plugin extras to front.
  if (pluginExtras) {
    cfg = _.extend({}, cfg, {
      plugins: pluginExtras.concat(cfg.plugins)
    });
  }

  // Single compiler for caching.
  var compiler = webpack(cfg);

  return function (done) {
    compiler.run(function (err, stats) {
      if (err) { throw new gutil.PluginError("webpack", err); }

      gutil.log("[webpack]", stats.toString({
        hash: true,
        colors: true,
        cached: false
      }));

      done();
    });
  };
};

// -----------
// Cleaning
// -----------
gulp.task("clean:all", function () {
  return gulp
    .src([
        "app/js-dist"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:dist", function () {
  return gulp.src(["app/js-dist"], { read: false })
    .pipe(rimraf());
});

// -----------
// Development
// -----------
gulp.task("build:dev", _webpack(buildCfg, [
  // Exclude optimize plugins.
  "DedupePlugin",
  "UglifyJsPlugin",
  "DefinePlugin"
]));
gulp.task("watch:dev", function () {
  gulp.watch([
    "client/**/*.{js,jsx}"
  ], ["build:dev"]);
});
gulp.task("watch", ["watch:dev"]);

// -----------
// Production
// -----------
gulp.task("build:prod", _webpack(buildCfg));
gulp.task("build:prod-full", ["clean:dist"], _webpack(buildCfg));
gulp.task("watch:prod", function () {
  gulp.watch([
    "client/**/*.{js,jsx}"
  ], ["build:prod"]);
});

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
// Dev. server
gulp.task("server", function () {
  nodemon({
    script: "server/index.js",
    ext: "js,jsx",
    watch: [
      "server",
      "client"
    ]
  });
});

// Source maps server
gulp.task("server:sources", function () {
  connect.server({
    root: __dirname,
    port: 3001
  });
});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task("ls",       ["build:ls", "watch:ls", "server:sources"]);
gulp.task("dev",      ["build:dev", "watch:dev", "server", "server:sources"]);
gulp.task("prod",     ["build:prod", "watch:prod", "server", "server:sources"]);
gulp.task("build",    ["build:prod-full"]);
gulp.task("default",  ["build:dev", "check"]);
