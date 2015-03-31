var React = require('react/addons');
var { Link, Navigation, State } = require('react-router');
var { FormattedNumber, FormattedRelative } = require('react-intl');
var cx = React.addons.classSet;

var Header = require('./Header');
var Title = require('./Title');
var Footer = require('./Footer');
var Button = require('./Button');
var BackButton = require('./BackButton');
var Content = require('./Content');
var TableView = require('./TableView');
var TableViewCell = require('./TableViewCell');
var Logotype = require('./Logotype');
var sx = require('../utils/styleSet');
var { TransactionActions } = require('../actions');
var { TransactionStore } = require('../stores')

var TransactionRow = React.createClass({
  render() {
    var { ower, owee, row } = this.props;
    var amount = row.get('value');
    var tweet = row.getIn(['doc', 'raw']);
    var screenName = tweet.getIn(['user', 'screen_name']);
    var link = `http://twitter.com/${screenName}/status/${tweet.get('id_str')}`
    var avatar = tweet.getIn(['user', 'profile_image_url']);
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
    TransactionStore.addChangeListener(this._onChange);
    this._refresh();
  },

  componentWillUnmount() {
    TransactionStore.removeChangeListener(this._onChange);
  },

  render() {
    var { ower, owee } = this.getParams();
    var { spin, transactions } = this.state;
    var total = transactions.reduce((r, v) => r + v.get('value'), 0);
    var [ subject, object ] = total < 0 ? [ owee, ower ] : [ ower, owee ];
    var value = Math.abs(total);

    var transactionRows = transactions
      .sortBy(row => -Date.parse(row.getIn(['doc', 'raw', 'created_at'])))
      .map(row => (
        <TransactionRow key={row.get('id')} ower={ower} owee={owee} row={row} />
      )).toArray();
    return (
      <article>
        <Header>
          <BackButton to="owees" params={{ ower }} />
          <Logotype style={styles.logo} spin={spin} onClick={this._refresh} />
          <Title>@{subject}</Title>
        </Header>
        <Footer>
          <Button primary block to="oweSomeoneElse" params={{ ower, owee }}>
            Owe @{owee}
          </Button>
        </Footer>
        <Content>
          <p className="content-padded" style={styles.subtitle}>
            owes @{object} $<FormattedNumber value={value} format="USD" />
          </p>
          <TableView>
            {transactionRows}
          </TableView>
        </Content>
      </article>
    );
  },

  _refresh() {
    var { ower, owee } = this.getParams();
    TransactionActions.fetchTransactions(ower, owee);
  },

  _onChange() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores() {
    var { ower, owee } = this.getParams();
    return {
      transactions: TransactionStore.get(ower, owee),
      spin: TransactionStore.getInflight()
    };
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
  },
  logo: {
    float: 'right',
    lineHeight: '44px',
    zIndex: 20,
    position: 'relative'
  }
};

module.exports = Transactions;
