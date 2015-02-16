var React = require('react');
var { Link, State } = require('react-router');

var Header = require('./Header');
var Title = require('./Title');
var Content = require('./Content');
var Button = require('./Button');

var Owe = React.createClass({
  mixins: [State],

  render() {
    var { ower, owee } = this.getParams();
    var linkTarget;
    if (ower) {
      linkTarget = { to: 'transactions', params: { ower: ower, owee: owee } };
    } else if (owee) {
      linkTarget = { to: 'owees', params: { ower: owee } };
    } else {
      linkTarget = { to: 'home' };
    }
    return (
      <div>
        <Header>
          <Link {...linkTarget} className="icon icon-left-nav pull-left" />
          <Title>Owe Someone</Title>
        </Header>
        <Content>
            <form className="input-group" onSubmit={this.tweet}>
              <div className="input-row">
                <label htmlFor="tweetName" style={styles.label}>@</label>
                <input
                  id="tweetName" name="name" type="text"
                  placeholder="twitter screen name"
                  defaultValue={owee}
                />
              </div>
              <div className="input-row">
                <label htmlFor="tweetAmount" style={styles.label}>#iou $</label>
                <input id="tweetAmount" name="amount" type="number" step="any" placeholder="amount" />
              </div>
              <div className="input-row">
                <label htmlFor="tweetReason" style={styles.label}>for</label>
                <input id="tweetReason" name="reason" type="text" placeholder="reason" />
              </div>
              <div className="input-row">
                <label htmlFor="tweetPlace" style={styles.label}>at</label>
                <input id="tweetPlace" name="place" type="text" placeholder="place" />
              </div>
              <div className="content-padded">
                <Button positive block>Tweet it</Button>
              </div>
            </form>
        </Content>
      </div>
    );
  },

  tweet(e) {
    e.preventDefault();
    var form = e.target;
    var { name, amount, reason, place } = form;
    [ name, reason, place ] = [ name, reason, place ].map(v => v.value);
    amount = amount.valueAsNumber;
    var tweet = `@${name} #iou $${amount}`;
    if (reason) {
      tweet = `${tweet} for ${reason}`;
    }
    if (place) {
      tweet = `${tweet} at ${place}`;
    }
    location.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  }
});

var styles = {
  label: {
    textAlign: 'right'
  }
};

module.exports = Owe;
