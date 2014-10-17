/** @jsx React.DOM */

var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var AppFactory = require('./AppFactory');
var OwersPage = require('./OwersPage');
var OweesPage = OwersPage;
var TransactionsPage = OwersPage;
var NotFound = OwersPage;

var RoutesFactory = function(initialData) {
    var App = AppFactory(initialData);
    var routes = (
        <Routes location="history">
            <Route path="/" handler={App}>
                <DefaultRoute name="owers" handler={OwersPage} />
                <Route name="owees" path="/:ower" handler={OweesPage} />
                <Route name="transactions" path="/:ower/:owee" handler={TransactionsPage} />
            </Route>
            <NotFoundRoute handler={NotFound} />
        </Routes>
    );
    return routes;
}

module.exports = RoutesFactory;
