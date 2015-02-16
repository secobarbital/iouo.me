var React = require('react');
var { Link, Navigation, State } = require('react-router');
var { FormattedNumber } = require('react-intl');

var Header = require('./Header');
var Footer = require('./Footer');
var Button = require('./Button');
var Card = require('./Card');
var Title = require('./Title');
var Content = require('./Content');
var Loading = require('./Loading');
var TableView = require('./TableView');
var BalanceRow = require('./BalanceRow');
var { OweeActions } = require('../actions');
var { OweeStore } = require('../stores');

var Owees = React.createClass({
  mixins: [Navigation, State],

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
        <BalanceRow key={owee} ower={ower} owee={owee} amount={amount} />
      )).toArray();

    return owees.size ? (
      <div>
        <Header>
          <Link to="owers" className="icon icon-left-nav pull-left" />
          <Title>@{ower}</Title>
        </Header>
        <Footer>
          <Button primary block onClick={this.owe}>Owe @{ower}</Button>
        </Footer>
        <Content>
          <p className="content-padded" style={styles.subtitle}>
            {verb} $<FormattedNumber value={value} format="USD" />
          </p>
          <Card>
            <TableView>
              {oweeRows}
            </TableView>
          </Card>
        </Content>
      </div>
    ) : <Loading/>;
  },

  owe() {
    var { ower } = this.getParams();
    this.transitionTo('oweSomeone', { owee: ower });
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
};

module.exports = Owees;
