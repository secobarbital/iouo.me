var React = require('react');
var { Link, RouteHandler } = require('react-router');
var { IntlMixin } = require('react-intl');

var Header = React.createClass({
  render: function() {
    return (
      <nav className="nav navbar">
        <div className="container">
          <div className="navbar-header">
            <Link to="owers" className="navbar-brand">IOU</Link>
          </div>
        </div>
      </nav>
    );
  }
});

var App = React.createClass({
  mixins: [IntlMixin],

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
