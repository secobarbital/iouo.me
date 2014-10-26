/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react/addons');
var request = require('superagent');
var prettyDate = require('../public/javascripts/pretty.js');
var Loading = require('./Loading');

var TransactionsHeader = React.createClass({
    render: function() {
        var owee = this.props.owee;
        var amount = this.props.amount;
        var subject = '@' + owee;
        var verb = 'owes';
        var formattedAmount = accounting.formatMoney(Math.abs(amount));
        var content;
        if (amount > 0) {
            content = [verb, subject, formattedAmount].join(' ');
        } else {
            content = [subject, verb, formattedAmount].join(' ');
        }
        return (
            <div className="content-padded balance-header">
                {content}
            </div>
        );
    }
});

var TransactionRow = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var owee = this.props.owee;
        var tweet = this.props.doc.raw;
        var link = 'http://twitter.com/' + tweet.user.id_str + '/status/' + tweet.id_str;
        var screenName = tweet.user.screen_name;
        var text = tweet.text;
        var timestamp = new Date(tweet.created_at).toISOString();
        var prettyTimestamp = prettyDate(timestamp);
        var avatar = tweet.user.profile_image_url;
        var avatarClasses = React.addons.classSet({
            'media-object': true,
            'pull-left': screenName === ower,
            'pull-right': screenName !== ower,
            'transaction-avatar': true
        });
        var bodyClasses = React.addons.classSet({
            'media-body': true,
            'transaction-right': screenName !== ower
        });
        return (
            <li className="table-view-cell media transaction">
                <a className="transaction-link" href={link}>
                    <img className={avatarClasses} src={avatar} />
                    <div className={bodyClasses}>
                        {text}
                        <p>&mdash; {screenName} <time dateTime={timestamp}>{prettyTimestamp}</time></p>
                    </div>
                </a>
            </li>
        );
    }
});

var TransactionsPage = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData;
        var ower = this.props.params.ower;
        var owee = this.props.params.owee;
        return {
            ower: this.props.params.ower,
            owee: this.props.params.owee,
            data: initialData || {}
        };
    },

    componentDidMount: function() {
        if (!this.props.initialData) {
            this.fetch();
        }
        setTimeout(function() {
            if (this.isMounted()) {
                this.props.setTitle('@' + this.state.ower);
                this.props.setLeftNav({
                    to: 'owees',
                    params: {
                        ower: this.state.ower
                    }
                });
            }
        }.bind(this), 0);
    },

    componentWillUnmount: function() {
        setTimeout(function() {
            this.props.setLeftNav(null);
            this.props.setTitle(null);
        }.bind(this), 0);
    },

    fetch: function() {
        var ower = this.state.ower;
        var owee = this.state.owee;
        var endpoint = '/api/' + ower + '/' + owee;
        request.get(endpoint, function(res) {
            if (this.isMounted()) {
                this.setState({
                    data: res.body
                });
            }
        }.bind(this));
    },

    render: function() {
        var data = this.state.data;
        if (!data.rows) {
            return <Loading />
        }
        var ower = this.state.ower;
        var owee = this.state.owee;
        var total = data.rows.reduce(function(sum, row) {
            return sum + row.value;
        }, 0);
        var transactionRows = data.rows.map(function(row) {
            return (
                <TransactionRow key={row.id} ower={ower} owee={owee} doc={row.doc} />
            );
        });
        return (
            <div className="content">
                <TransactionsHeader owee={owee} amount={total} />
                <ul className="table-view">
                    {transactionRows}
                </ul>
            </div>
        );
    }
});

module.exports = TransactionsPage;
