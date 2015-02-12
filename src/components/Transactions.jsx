var React = require('react/addons');
var { Link, State } = require('react-router');
var { FormattedNumber, FormattedRelative } = require('react-intl');
var cx = React.addons.classSet;

var { TransactionActions } = require('../actions');
var { TransactionStore } = require('../stores')
var styles = require('./Styles').balance;

var TransactionHeading = React.createClass({
  render() {
    var { ower, owee, amount } = this.props;
    var owerLink = <Link to="owees" params={{ ower: ower }}>@{ower}</Link>;
    var oweeLink = <Link to="owees" params={{ ower: owee }}>@{owee}</Link>;
    var value = Math.abs(amount);
    var content;
    if (amount > 0) {
      content = <span>{owerLink} owes {oweeLink}</span>
    }
    if (amount < 0) {
      content = <span>{oweeLink} owes {owerLink}</span>
    }
    if (amount === 0) {
      content = <span>{owerLink} and {oweeLink} are even</span>
    }
    return (
      <div className="panel-heading">
        {content}
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

var TransactionRow = React.createClass({
  render() {
    var { ower, owee, doc } = this.props;
    var amount = doc.get('amount');
    var tweet = doc.get('raw');
    var owerId = tweet.getIn(['user', 'id_str']);
    var link = `http://twitter.com/${owerId}/status/${tweet.get('id_str')}`
    var avatar = tweet.getIn(['user', 'profile_image_url']);
    var screenName = tweet.getIn(['user', 'screen_name']);
    var createdAt = tweet.get('created_at');
    var left = screenName === owee ^ amount > 0;
    var quoteClass = cx({
      'blockquote-reverse': !left
    });
    var mediaClass = cx({
      'media-left': left,
      'media-right': !left
    });
    var mediaObject = (
      <div className={mediaClass}>
          <img className="media-object" style={styles.avatar} src={avatar} />
      </div>
    );
    return (
      <a href={link}>
        <div className="media">
          {!!left && mediaObject}
          <div className="media-body">
            <blockquote className={quoteClass} style={styles.quote}>
              <p>{tweet.get('text')}</p>
              <footer>{screenName} <cite><FormattedRelative value={createdAt} /></cite></footer>
            </blockquote>
          </div>
          {!left && mediaObject}
        </div>
      </a>
    );
  }
});

var Transactions = React.createClass({
  mixins: [State],

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
    var total = transactions.reduce((r, v) => r + v.get('amount'), 0);
    var transactionRows = transactions
      .map(doc => (
        <TransactionRow key={doc.get('_id')} ower={ower} owee={owee} doc={doc} />
      )).toArray();
    return (
      <section className="container">
        <div className="panel panel-default">
          <TransactionHeading ower={ower} owee={owee} amount={total} />
          {transactionRows}
        </div>
      </section>
    );
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
  avatar: {
    width: 64,
    height: 64
  },
  quote: {
    border: 'none'
  }
};

module.exports = Transactions;
