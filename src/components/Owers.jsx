var React = require('react');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');

var Header = require('./Header');
var Title = require('./Title');
var bStyles = require('./Styles').balance;
var { OwerStore } = require('../stores');
var { OwerActions } = require('../actions');

var OwerRow = React.createClass({
  render() {
    var { ower, amount } = this.props;
    var value = Math.abs(amount);
    var verb = 'is even';
    if (amount > 0) verb = 'owes';
    if (amount < 0) verb = 'is owed';
    return (
      <li className="table-view-cell" style={bStyles.cell}>
        <Link to="owees" params={{ ower: ower }} style={bStyles.link}>
          @<span style={bStyles.subject}>{ower}</span> {verb}
          <span style={bStyles.amount}>
            <span style={bStyles.currency}>$ </span>
            <span style={bStyles.value}>
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
    return owers.size ? (
      <div>
        <Header>
          <Link to="owe" className="icon icon-compose pull-right"></Link>
          <Title>iouo.me</Title>
        </Header>
        <div className="content" style={styles.content}>
          <p className="content-padded">Why pay when you can owe?</p>
          <div className="card">
            <ul className="table-view">{owerRows}</ul>
          </div>
        </div>
      </div>
    ) : <Loading/>;
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    return { owers: OwerStore.getAll() };
  }
});

var styles = {
  content: {
    background: 'whitesmoke'
  }
};

module.exports = Owers;
