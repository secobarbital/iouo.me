var jade = require('jade');
var assign = require('object-assign');

var rollbar = require('./rollbar');

var renderFile = jade.renderFile;
var defaultOptions = {
  faCdnUrl: process.env.FONTAWESOME_CDN_URL,
  ratchetCdnUrl: process.env.RATCHET_CDN_URL,
  cdnUrl: process.env.CDN_URL,
  rollbar: rollbar.clientSnippet
};

jade.__express = jade.renderFile = function(path, options, fn) {
  options = assign({}, defaultOptions, options);
  return renderFile(path, options, fn);
}

module.exports = jade;
