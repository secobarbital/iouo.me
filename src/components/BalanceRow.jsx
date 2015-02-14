var React = require('react');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');

var TableViewCell = require('./TableViewCell');

var CrossBalanceRow = React.createClass({
  render() {
    var { subject, object, amount, to, params } = this.props;
    var verb = 'is even with';
    if (amount) verb = 'owes';
    if (amount < 0) {
      subject = this.props.object;
      object = this.props.subject;
    }
    return (
      <TableViewCell style={styles.cell}>
        <Link to={to} params={params}>
          @<span style={styles.subject}>{subject}</span>
          {verb}
          @<span style={styles.object}>{object}</span>
          {getDisplayAmount(amount)}
        </Link>
      </TableViewCell>
    );
  }
});

var BalanceRow = React.createClass({
  render() {
    var { subject, object, amount, to, params } = this.props;
    if (subject && object) return <CrossBalanceRow {...this.props} />;

    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <TableViewCell style={styles.cell}>
        <Link to={to} params={params} style={styles.link}>
          @<span style={styles.subject}>{subject}</span> {verb}
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
  object: {
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
