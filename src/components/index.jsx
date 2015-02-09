var React = require('react');

var App = require('./App');
var Owers = require('./Owers');
var Owees = require('./Owees');

var Empty = React.createClass({
  render: function() {
    return null;
  }
});

module.exports = {
  App: App,
  Owers: Owers,
  Owees: Owees,
  Transactions: Empty
};
