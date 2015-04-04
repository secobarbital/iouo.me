var React = require('react/addons');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');
var PureRenderMixin = React.addons.PureRenderMixin;

var TableViewCell = require('./TableViewCell');

var CrossBalanceRow = React.createClass({
  render() {
    var { ower, owee, amount } = this.props;
    var verb = amount ? 'owes' : 'is even';
    return (
      <TableViewCell style={styles.cell}>
        <Link to="transactions" params={{ ower: ower, owee: owee }} style={styles.link}>
          {amount > 0 && verb} @<span style={styles.subject}>{owee}</span> {amount <= 0 && verb}
          {getDisplayAmount(amount)}
        </Link>
      </TableViewCell>
    );
  }
});

var BalanceRow = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    var { ower, owee, amount } = this.props;
    if (owee) return <CrossBalanceRow {...this.props} />;

    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <TableViewCell style={styles.cell}>
        <Link to="owees" params={{ ower: ower }} style={styles.link}>
          @<span style={styles.subject}>{ower}</span> {verb}
          {getDisplayAmount(amount)}
        </Link>
      </TableViewCell>
    );
  }
});

function getDisplayAmount(amount) {
  var value = Math.abs(amount);
  return !!amount && (
    <span style={styles.amount}>
      <span style={styles.currency}>$</span>
      <span style={styles.value}>
        <FormattedNumber value={value} format="USD" />
      </span>
    </span>
  );
}

var styles = {
  subject: {
    'fontWeight': 'bold'
  },
  currency: {
  },
  value: {
  },
  amount: {
    'float': 'right'
  },
  cell: {
    paddingRight: 15
  },
  link: {
    paddingRight: 15,
    marginRight: -15
  }
};

module.exports = BalanceRow;
