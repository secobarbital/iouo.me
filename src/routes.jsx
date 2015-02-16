var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var { App, Owers, Owees, Transactions, Owe } = require('./components');

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute name="owers" handler={Owers} />
    <Route name="owe" path="owe">
      <DefaultRoute name="oweAnyone" handler={Owe} />
      <Route name="oweSomeoneElse" path=":ower/:owee" handler={Owe} />
      <Route name="oweSomeone" path=":owee" handler={Owe} />
    </Route>
    <Route name="owees" path=":ower" handler={Owees} />
    <Route name="transactions" path=":ower/:owee" handler={Transactions} />
  </Route>
);

module.exports = routes;
