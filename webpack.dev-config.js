/**
 * Webpack configuration
 */

var _ = require("lodash");
var webpack = require("webpack");
var prodConfig = require("./webpack.config");

module.exports = _.extend({}, prodConfig, {
  plugins: [
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      "bundle.js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/app/js-dist/[url]")
  ]
});
