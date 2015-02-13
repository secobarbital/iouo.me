var React = require('react/addons');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');

var Header = require('./Header');
var styles = require('./Styles').balance;
var { OwerStore } = require('../stores');
var { OwerActions } = require('../actions');

var OwerRow = React.createClass({
  render() {
    var { ower, amount } = this.props;
    console.log('ower', ower, amount)
    var value = Math.abs(amount);
    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <li className="table-view-cell">
        <Link className="navigate-right" to="owees" params={{ ower: ower }}>
          @<span style={styles.subject}>{ower}</span> {verb}
          <span style={styles.amount}>
            <span style={styles.currency}>$ </span>
            <span style={styles.value}>
              <FormattedNumber value={value} format="USD" />
            </span>
          </span>
        </Link>
      </li>
    );
  }
});

var Owers = React.createClass({
  getInitialState() {
    return this._getStateFromStores();
  },

  componentDidMount() {
    OwerStore.addChangeListener(this._onChange);
    OwerActions.fetchOwers();
  },

  componentWillUnmount() {
    OwerStore.removeChangeListener(this._onChange);
  },

  render() {
    var { owers } = this.state;
    var owerRows = owers
      .filter(amount => amount !== 0)
      .sortBy(amount => -amount)
      .map((amount, ower) => (
        <OwerRow key={ower} ower={ower} amount={amount} />
      )).toArray();
    return (
      <div>
        <Header/>
        <ul className="table-view">
          {owerRows}
        </ul>
      </div>
    );
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    return { owers: OwerStore.getAll() };
  }
});

module.exports = Owers;
