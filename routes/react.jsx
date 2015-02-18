require('intl');

var React = require('react');
var Router = require('react-router');
var trumpet = require('trumpet');
var fs = require('fs');
var es = require('event-stream');

var db = require('../config/db');
var intlData = require('../src/intlData');
var routes = require('../src/routes');

var handleRoutes = function(req, res, next) {
  if (!req.accepts('html')) return next();
  Router.run(routes, req.url, function(Handler, state) {
    var tr = trumpet();
    var theData = tr.select('#theData').createWriteStream();
    var theBody = tr.select('body').createWriteStream();

    var layout = fs.createReadStream(`${__dirname}/../public/react-router.html`);
    var data = db.balances(state.params.ower, state.params.owee, true);
    var renderBody = es.wait(function(err, body) {
      var initialData = JSON.parse(body.toString());
      theBody.end(React.renderToString(<Handler {...intlData} initialData={initialData} />));
    });

    data.pipe(renderBody).pipe(theData);
    layout.pipe(tr).pipe(res);
  });
};

module.exports = handleRoutes;
