/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var request = require('superagent');
var Loading = require('./Loading');

var OweesHeader = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var amount = this.props.amount;
        var verb = amount > 0 ? 'owes' : 'is owed';
        var formattedAmount = accounting.formatMoney(Math.abs(amount));
        return (
            <div className="content-padded balance-header">
                {verb} {formattedAmount}
            </div>
        );
    }
});

var OweeRow = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var owee = this.props.owee;
        var amount = this.props.amount;
        var formattedAmount = accounting.formatMoney(Math.abs(amount), '');
        var subject = <span className="subject">@{owee}</span>;
        var verb = <span className="verb">owes</span>;
        var lhs = amount > 0 ? <span>{verb} {subject}</span> : <span>{subject} {verb}</span>;
        return (
            <li className="table-view-cell">
                <Link to={this.props.to} params={this.props.params} className="navigate-right">
                    <div className="balance-row-rhs">
                        <span className="currency">$</span> <span className="amount">{formattedAmount}</span>
                    </div>
                    {lhs}
                </Link>
            </li>
        );
    }
});

var OweesPage = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData;
        var ower = this.props.params.ower;
        return {
            ower: ower,
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
                this.props.setLeftNav({ to: 'owers' });
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
        var endpoint = '/api/' + ower;
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
        var total = data.rows.reduce(function(sum, row) {
            return sum + row.value;
        }, 0);
        var oweeRows = data.rows.filter(function(row) {
            return row.value !== 0;
        }).sort(function(a, b) {
            return b.value - a.value;
        }).map(function(row) {
            var owee = row.key[1];
            var amount = row.value;
            var params = {
                ower: ower,
                owee: owee
            };
            return (
                <OweeRow key={'balance-' + ower + '-' + owee} owee={owee} amount={amount} to="transactions" params={params} />
            );
        });
        return (
            <div className="content">
                <OweesHeader ower={ower} amount={total} />
                <ul className="table-view">
                    {oweeRows}
                </ul>
            </div>
        );
    }
});

module.exports = OweesPage;
