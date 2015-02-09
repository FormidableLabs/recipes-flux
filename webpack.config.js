// Webpack configuration
var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "app/js-dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      "bundle.js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/app/js-dist/[url]")
  ]
};
