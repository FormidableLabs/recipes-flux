var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.hot-config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: config.contentBase,
  hot: true
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3001');
});