var cachify = require('connect-cachify');
var path = require('path');

var assets = {
  '/bundle.js': [ '/bundle.js' ]
};

var options = {
  root: path.join(__dirname, '..', 'public'),
  production: process.env.NODE_ENV === 'production',
  prefix: process.env.CDN_URL
};

module.exports = cachify.setup(assets, options);
