var React = require('react/addons');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');
var cx = React.addons.classSet;

var OwerActions = require('../actions/OwerActions');
var styles = require('./Styles').balance;
var { OwerStore } = require('../stores');

var OwerRow = React.createClass({
  render() {
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
        @<span style={styles.subject}>{ower}</span> {verb}
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

var Owers = React.createClass({
  getInitialState: () => ({ owers: OwerStore.getAll() }),

  componentDidMount() {
    OwerStore.addChangeListener(this._onChange);
    OwerActions.fetchOwers();
  },

  componentWillUnmount() {
    OwerStore.removeChangeListener(this._onChange);
  },

  render() {
    var { owers } = this.state;
    var owerRows = owers.sortBy(v => -v).map((amount, ower) => (
      <OwerRow key={ower} ower={ower} amount={amount} />
    )).toArray();
    return (
      <section className="container">
        <div className="list-group">
          {owerRows}
        </div>
      </section>
    );
  },

  _onChange() {
    this.setState({ owers: OwerStore.getAll() })
  }
});

module.exports = Owers;
