var React = require('react');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');

var { OwerStore } = require('../stores');

var OwerRow = React.createClass({
  render: function() {
    var { ower, amount } = this.props;
    var value = Math.abs(amount);
    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <Link className="list-group-item" to="owees" params={{ ower: ower }}>
        <span style={styles.ower}>{ower}</span>
        <span style={styles.verb}> {verb} </span>
        <span style={styles.amount}>
          <FormattedNumber value={value} format="USD" />
        </span>
      </Link>
    );
  }
});

var Owers = React.createClass({
  getInitialState: function() {
    return {
      owers: OwerStore.getAll()
    }
  },

  render: function() {
    var { owers } = this.state;
    var owerRows = owers.map((amount, ower) => (
      <OwerRow key={ower} ower={ower} amount={amount} />
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

var styles = {
  ower: {
    'fontWeight': 'bold'
  },
  amount: {
    'float': 'right',
    'fontFamily': 'Georgia,Palatino,serif',
    'fontSize': '142.857143%',
    'lineHeight': 1
  }
};

module.exports = Owers;
