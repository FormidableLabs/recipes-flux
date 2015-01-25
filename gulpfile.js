/**
 * Gulpfile
 */
var fs = require("fs");
// var _ = require("lodash");
var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var jsxcs = require("gulp-jsxcs");
var nodemon = require("gulp-nodemon");
var connect = require("gulp-connect");
var webpack = require("webpack");
var rimraf = require("gulp-rimraf");

var buildCfg = require("./webpack.config");
var buildDevCfg = require("./webpack.dev-config");

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
// JsCs
// ----------------------------------------------------------------------------
gulp.task("jscs", function () {
  return gulp
    .src([
      "client/**/*.{js,jsx}",
      "scripts/**/*.js",
      "server/**/*.js",
      "test/**/*.js",
      "*.js"
    ])
    .pipe(jsxcs(_jsonCfg(".jscsrc")));
});

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("check",      ["jscs", "jshint"]);
gulp.task("check:ci",   ["jscs", "jshint"]);
gulp.task("check:all",  ["jscs", "jshint"]);

// -----------
// Cleaning
// -----------
gulp.task("clean:all", function () {
  return gulp
    .src([
        "app/css-dist",
        "app/js-dist"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:dist", function () {
  return gulp
    .src([
        "app/css-dist",
        "app/js-dist"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("build:dev", function (done) {
  webpack(buildDevCfg).run(function (err, stats) {
    if (err) { throw new gutil.PluginError("webpack", err); }

    gutil.log("[webpack]", stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));

    done();
  });
});

gulp.task("watch:dev", function () {
  gulp.watch([
    "client/**/*.{js,jsx}"
  ], ["build:dev"]);
});
gulp.task("watch", ["watch:dev"]);

// -----------
// Production
// -----------
gulp.task("build:prod", function (done) {
  webpack(buildCfg).run(function (err, stats) {
    if (err) { throw new gutil.PluginError("webpack", err); }

    gutil.log("[webpack]", stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));

    done();
  });
});

gulp.task("build:prod-full", ["clean:dist"], function () {
  return gulp.run("build:prod");
});

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
