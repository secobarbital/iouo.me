var React = require('react');
var { Link } = require('react-router');
var { FormattedNumber } = require('react-intl');

var Header = require('./Header');
var Footer = require('./Footer');
var Button = require('./Button');
var Title = require('./Title');
var Content = require('./Content');
var TableView = require('./TableView');
var Card = require('./Card');
var BalanceRow = require('./BalanceRow');
var Loading = require('./Loading');
var { OwerStore } = require('../stores');
var { OwerActions } = require('../actions');

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
        <BalanceRow key={ower} ower={ower} amount={amount} />
      )).toArray();
    return owers.size ? (
      <article>
        <Header>
          <Title>I<i className="fa fa-refresh"></i>U</Title>
        </Header>
        <Footer>
          <Button primary block to="owe">Owe Someone</Button>
        </Footer>
        <Content>
          <p className="content-padded">Why pay when you can owe?</p>
          <Card>
            <TableView>{owerRows}</TableView>
          </Card>
        </Content>
      </article>
    ) : <Loading/>;
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    return { owers: OwerStore.getAll() };
  }
});

module.exports = Owers;
