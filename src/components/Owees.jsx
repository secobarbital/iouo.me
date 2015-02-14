var React = require('react');
var { Link, State } = require('react-router');
var { FormattedNumber } = require('react-intl');

var Header = require('./Header');
var Title = require('./Title');
var Content = require('./Content');
var Loading = require('./Loading');
var TableView = require('./TableView');
var BalanceRow = require('./BalanceRow');
var { OweeActions } = require('../actions');
var { OweeStore } = require('../stores');

var Owees = React.createClass({
  mixins: [State],

  getInitialState() {
    return this._getStateFromStores();
  },

  componentDidMount() {
    var { ower } = this.getParams();
    OweeStore.addChangeListener(this._onChange);
    OweeActions.fetchOwees(ower);
  },

  componentWillUnmount() {
    OweeStore.removeChangeListener(this._onChange);
  },

  render() {
    var { ower } = this.getParams();
    var { owees } = this.state;
    var total = owees.reduce((r, v) => r + v, 0);
    var verb = 'is even';
    if (total > 0) verb = 'owes';
    if (total < 0) verb = 'is owed';
    var value = Math.abs(total);
    var oweeRows = owees
      .filter(amount => amount !== 0)
      .sortBy(amount => -amount)
      .map((amount, owee) => (
        <BalanceRow
          to="transactions" params={{ ower: ower, owee: owee }}
          key={owee} subject={owee} amount={amount}
        />
      )).toArray();

    return owees.size ? (
      <div>
        <Header>
          <Link to="owers" className="icon icon-left-nav pull-left"></Link>
          <Title>@{ower}</Title>
        </Header>
        <Content>
          <p className="content-padded" style={styles.subtitle}>
            {verb} $<FormattedNumber value={value} format="USD" />
          </p>
          <div className="card">
            <TableView>
              {oweeRows}
            </TableView>
          </div>
        </Content>
      </div>
    ) : <Loading/>;
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    var { ower } = this.getParams();
    return { owees: OweeStore.get(ower) };
  }
});

var styles = {
  subtitle: {
    textAlign: 'center'
  }
}

module.exports = Owees;
