var React = require('react');

var App = require('./App');
var Owers = require('./Owers');

var Empty = React.createClass({
  render: function() {
    return null;
  }
});

module.exports = {
  App: App,
  Owers: Owers,
  Owees: Empty,
  Transactions: Empty
};
