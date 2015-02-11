var React = require('react/addons');
var { Link, State } = require('react-router');
var { FormattedNumber } = require('react-intl');
var { Map } = require('immutable');
var cx = React.addons.classSet;

var { OweeStore } = require('../stores');
var styles = require('./Styles').balance;

var OwerHeading = React.createClass({
  render() {
    var { ower, amount } = this.props;
    var value = Math.abs(amount);
    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <div className="panel-heading">
        @<span style={styles.subject}>{ower}</span> {verb}
        <span style={styles.amount}>
          <span style={styles.currency}>$ </span>
          <span style={styles.value}>
            <FormattedNumber value={value} format="USD" />
          </span>
        </span>
      </div>
    );
  }
});

var OweeRow = React.createClass({
  render() {
    var { ower, owee, amount } = this.props;
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
      <Link className={cx(classes)} to="transactions" params={{ ower: ower, owee: owee }}>
        @<span style={styles.subject}>{owee}</span> {verb}
        <span style={styles.amount}>
          <span style={styles.currency}>$ </span>
          <span style={styles.value}>
            <FormattedNumber value={value} format="USD" />
          </span>
        </span>
      </Link>
    );
  }
});

var Owees = React.createClass({
  mixins: [State],

  getInitialState() {
    return this._getStateFromStores();
  },

  componentDidMount() {
    OweeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    OweeStore.removeChangeListener(this._onChange);
  },

  render() {
    var { ower } = this.getParams();
    var { owees } = this.state;
    var total = owees.reduce((r, v) => r + v, 0);
    var oweeRows = owees.sortBy(v => -v).map((amount, owee) => (
      <OweeRow key={owee} ower={ower} owee={owee} amount={amount} />
    )).toArray();

    return (
      <section className="container">
        <div className="panel panel-default">
          <OwerHeading ower={ower} amount={total} />
          <div className="list-group">
            {oweeRows}
          </div>
        </div>
      </section>
    );
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    var { ower } = this.getParams();
    return { owees: OweeStore.get(ower) || Map() };
  }
});

module.exports = Owees;
