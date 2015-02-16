var React = require('react/addons');
var { Link, Navigation, State } = require('react-router');
var { FormattedNumber, FormattedRelative } = require('react-intl');
var cx = React.addons.classSet;

var Header = require('./Header');
var Title = require('./Title');
var Footer = require('./Footer');
var Button = require('./Button');
var Content = require('./Content');
var TableView = require('./TableView');
var TableViewCell = require('./TableViewCell');
var sx = require('../utils/styleSet');
var { TransactionActions } = require('../actions');
var { TransactionStore } = require('../stores')

var TransactionRow = React.createClass({
  render() {
    var { ower, owee, row } = this.props;
    var amount = row.get('value');
    var tweet = row.getIn(['doc', 'raw']);
    var owerId = tweet.getIn(['user', 'id_str']);
    var link = `http://twitter.com/${owerId}/status/${tweet.get('id_str')}`
    var avatar = tweet.getIn(['user', 'profile_image_url']);
    var screenName = tweet.getIn(['user', 'screen_name']);
    var createdAt = tweet.get('created_at');
    var left = screenName === ower;
    var cellStyle = sx(!left && styles.right, styles.cell);
    var avatarClass = cx({
      'media-object': true,
      'pull-left': left,
      'pull-right': !left
    });
    return (
      <TableViewCell className="media" style={cellStyle}>
        <a href={link} style={styles.link}>
          <img className={avatarClass} style={styles.avatar} src={avatar} />
          <div className="media-body">
            <p>{screenName} &middot; <FormattedRelative value={createdAt} /></p>
            {tweet.get('text')}
          </div>
        </a>
      </TableViewCell>
    );
  }
});

var Transactions = React.createClass({
  mixins: [Navigation, State],

  getInitialState() {
    return this._getStateFromStores();
  },

  componentDidMount() {
    var { ower, owee } = this.getParams();
    TransactionStore.addChangeListener(this._onChange);
    TransactionActions.fetchTransactions(ower, owee);
  },

  componentWillUnmount() {
    TransactionStore.removeChangeListener(this._onChange);
  },

  render() {
    var { ower, owee } = this.getParams();
    var { transactions } = this.state;
    var total = transactions.reduce((r, v) => r + v.get('value'), 0);
    var [ subject, object ] = total < 0 ? [ owee, ower ] : [ ower, owee ];
    var value = Math.abs(total);

    var transactionRows = transactions
      .map(row => (
        <TransactionRow key={row.get('id')} ower={ower} owee={owee} row={row} />
      )).toArray();
    return (
      <div>
        <Header>
          <Link to="owees" params={{ ower: ower }} className="icon icon-left-nav pull-left" />
          <Title>@{subject}</Title>
        </Header>
        <Footer>
          <Button positive block onClick={this.owe}>Owe @{owee}</Button>
        </Footer>
        <Content>
          <p className="content-padded" style={styles.subtitle}>
            owes @{object} $<FormattedNumber value={value} format="USD" />
          </p>
          <TableView>
            {transactionRows}
          </TableView>
        </Content>
      </div>
    );
  },

  owe() {
    var { ower, owee } = this.getParams();
    this.transitionTo('oweSomeoneElse', { ower: ower, owee: owee });
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    var { ower, owee } = this.getParams();
    return { transactions: TransactionStore.get(ower, owee) };
  }
});

var styles = {
  right: {
    textAlign: 'right'
  },
  cell: {
    paddingRight: 15
  },
  link: {
    marginRight: -15
  },
  subtitle: {
    textAlign: 'center'
  },
  avatar: {
    width: 42,
    height: 42
  },
  quote: {
    border: 'none'
  }
};

module.exports = Transactions;
