var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

var intlData = {
  "locales": "en-US",
  "formats": {
    "number": {
      "USD": {
        "style": "currency",
        "currency": "USD",
        "minimumFractionDigits": 2,
        "maximumFractionDigits": 2
      }
    }
  }
}

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...intlData} />, document.body);
});
