var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var { App, Owers, Owees, Transactions, Owe } = require('./components');

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute name="owers" handler={Owers} />
    <Route name="owe" handler={Owe} />
    <Route name="owees" path=":ower" handler={Owees} />
    <Route name="transactions" path=":ower/:owee" handler={Transactions} />
  </Route>
);

module.exports = routes;
