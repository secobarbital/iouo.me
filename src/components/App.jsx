var React = require('react');
var { Link, RouteHandler } = require('react-router');

var Header = React.createClass({
  render: function() {
    return (
      <header className="nav navbar-default">
        <div className="container">
          <Link to="owers" className="navbar-brand">IOU</Link>
        </div>
      </header>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
