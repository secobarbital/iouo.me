var React = require('react');
var { Link } = require('react-router');

var { OwerStore } = require('../stores');

var Owers = React.createClass({
  getInitialState: function() {
    return {
      owers: OwerStore.getAll()
    }
  },

  render: function() {
    var { owers } = this.state;
    var owerRows = owers.map((amount, ower) => (
      <Link className="list-group-item" to="owees" params={{ ower: ower }} key={ower}>
        {ower} owes {amount}
      </Link>
    )).toArray();
    return (
      <section className="container">
        <div className="list-group">
          {owerRows}
        </div>
      </section>
    );
  }
});

module.exports = Owers;
