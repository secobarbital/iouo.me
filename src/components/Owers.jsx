var React = require('react/addons');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');
var cx = React.addons.classSet;

var { OwerStore } = require('../stores');

var OwerRow = React.createClass({
  render: function() {
    var { ower, amount } = this.props;
    var value = Math.abs(amount);
    var classes = {
      'list-group-item': true,
      'list-group-item-success': amount < -10,
      'list-group-item-info': amount <= 0 && amount >= -10,
      'list-group-item-warning': amount > 0 && amount <= 10,
      'list-group-item-danger': amount > 10
    };
    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <Link className={cx(classes)} to="owees" params={{ ower: ower }}>
        <span style={styles.ower}>{ower}</span>
        <span style={styles.verb}> {verb} </span>
        <span style={styles.amount}>
          <FormattedNumber value={value} format="USD" />
        </span>
        <span style={styles.currency}>$ </span>
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
  currency: {
    'float': 'right'
  },
  amount: {
    'float': 'right',
    'fontFamily': 'Georgia,Palatino,serif',
    'fontSize': '142.857143%',
    'lineHeight': 1
  }
};

module.exports = Owers;
