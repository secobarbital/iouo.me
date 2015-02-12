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
    var { doc } = this.props;
    var ower = doc.get('ower');
    var owee = doc.get('owee');
    var amount = doc.get('amount');
    var tweet = doc.get('raw');
    var owerId = tweet.getIn(['user', 'id_str']);
    var link = `http://twitter.com/${owerId}/status/${tweet.get('id_str')}`
    var avatar = tweet.getIn(['user', 'profile_image_url']);
    var screenName = tweet.getIn(['user', 'screen_name']);
    var createdAt = tweet.get('created_at');
    var left = screenName === owee ^ amount > 0;
    var mediaClass = left ? 'media-left' : 'media-right';
    var bodyStyles = {
      textAlign: left ? 'left' : 'right'
    }
    return (
      <a className="list-group-item media" href={link}>
        <div className={mediaClass}>
          <img className="media-object" src={avatar} />
        </div>
        <div className="media-body" style={bodyStyles}>
          <div>{tweet.get('text')}</div>
          <small className="text-muted">
            &mdash; {screenName} <FormattedRelative value={createdAt} />
          </small>
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
    var transactionRows = transactions.map((doc) => (
      <TransactionRow key={doc.get('_id')} doc={doc} />
    )).toArray();
    return (
      <section className="container">
        <div className="panel panel-default">
          <TransactionHeading ower={ower} owee={owee} amount={total} />
          <div className="list-group">
            {transactionRows}
          </div>
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

module.exports = Transactions;
