var React = require('react/addons');
var { Link, Navigation, State } = require('react-router');
var { FormattedNumber } = require('react-intl');
var PureRenderMixin = React.addons.PureRenderMixin;

var Header = require('./Header');
var Footer = require('./Footer');
var Button = require('./Button');
var BackButton = require('./BackButton');
var Card = require('./Card');
var Title = require('./Title');
var Content = require('./Content');
var Loading = require('./Loading');
var Logotype = require('./Logotype');
var TableView = require('./TableView');
var BalanceRow = require('./BalanceRow');
var { OweeActions } = require('../actions');
var { OweeStore } = require('../stores');

var Owees = React.createClass({
  mixins: [Navigation, State, PureRenderMixin],

  getInitialState() {
    return this._getStateFromStores();
  },

  componentDidMount() {
    OweeStore.addChangeListener(this._onChange);
    this._refresh();
  },

  componentWillUnmount() {
    OweeStore.removeChangeListener(this._onChange);
  },

  render() {
    var { ower } = this.getParams();
    var { owees, spin } = this.state;
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
      <article>
        <Header>
          <BackButton to="owers" />
          <Logotype style={styles.logo} spin={spin} onClick={this._refresh} />
          <Title>@{ower}</Title>
        </Header>
        <Footer>
          <Button primary block to="oweSomeone" params={{ owee: ower }}>
            Owe @{ower}
          </Button>
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
      </article>
    ) : <Loading/>;
  },

  _refresh() {
    var { ower } = this.getParams();
    OweeActions.fetchOwees(ower);
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    var { ower } = this.getParams();
    return {
      owees: OweeStore.get(ower),
      spin: OweeStore.getInflight()
    };
  }
});

var styles = {
  subtitle: {
    textAlign: 'center'
  },
  logo: {
    float: 'right',
    lineHeight: '44px',
    zIndex: 20,
    position: 'relative'
  }
};

module.exports = Owees;
