var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: "eval",
  cache: true,
  entry: [
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/only-dev-server",
    "./hot/entry"
  ],
  contentBase: path.join(__dirname, "/hot"),
  output: {
    path: path.join(__dirname, "/app/"),
    filename: "bundle.js",
    publicPath: "/app/js-dist/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ["react-hot-loader", "jsx-loader?harmony"] },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
    ]
  }
};
