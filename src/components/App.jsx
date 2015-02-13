var React = require('react');
var { Link, RouteHandler } = require('react-router');
var { IntlMixin } = require('react-intl');

var Header = require('./Header');

var App = React.createClass({
  mixins: [IntlMixin],

  render: function() {
    return <RouteHandler/>;
  }
});

module.exports = App;
