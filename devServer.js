var http = require('http');
var httpProxy = require('http-proxy');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

var wdsPort = process.env.WDS_PORT || 2992;
var proxyPort = process.env.PROXY_PORT || 5000;
var serverPort = process.env.PORT || 3000;

var wdsProxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: wdsPort
  }
});
var serverProxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: serverPort
  }
});

config.devtool = 'eval-source-map';
config.entry = [
  `webpack-dev-server/client?`,
  'webpack/hot/only-dev-server',
  config.entry
];
config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);
config.module.loaders.forEach(function(loader) {
  if (loader.loader.indexOf('6to5') > -1) {
    loader.loaders = ['react-hot', loader.loader];
    delete loader.loader;
  }
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(wdsPort, 'localhost', function (err, result) {
  if (err) {
    console.error(err);
  }

  console.log(`WebpackDevServer listening on port ${wdsPort}`);
});

var proxyServer = http.createServer(function(req, res) {
  var bundle = `${config.output.publicPath}${config.output.filename}`;
  if (
    req.url === bundle ||
    req.url.match(/\/socket.io\//) ||
    req.url.match(/\.hot-update\./) ||
    req.url.match(/\.map$/)
  ) {
    wdsProxy.web(req, res);
  } else {
    serverProxy.web(req, res);
  }
});

proxyServer.on('upgrade', function(req, socket, head) {
  wdsProxy.ws(req, socket, head);
});

console.log(`Proxy server listening on port ${proxyPort}`);
proxyServer.listen(proxyPort);
