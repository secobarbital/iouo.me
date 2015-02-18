var React = require('react');
var Router = require('react-router');

var intlData = require('./intlData');
var routes = require('./routes');

if ('iouReady' in window) {
  main();
} else {
  window.iouMain = main;
}

function main() {
  var theData = JSON.parse(document.getElementById('theData').innerHTML);
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler {...intlData} initialData={theData} />, document.body);
    theData = null;
  });
}
