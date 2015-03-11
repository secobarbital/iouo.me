if (!global.Intl) {
  global.Intl = require('intl/Intl.en');
}
var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

var intlData = {
  locales: 'en-US',
  formats: {
    number: {
      USD: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
};

if (global.iouReady) {
  main();
} else {
  global.iouMain = main;
}

function main() {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler {...intlData} />, document.body);
  });
}
