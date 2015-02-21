var React = require('react');
var { RouteHandler } = require('react-router');
var { IntlMixin } = require('react-intl');

var Header = require('./Header');

var App = React.createClass({
  mixins: [IntlMixin],

  render: function() {
    return <RouteHandler/>;
  }
});

module.exports = App;
