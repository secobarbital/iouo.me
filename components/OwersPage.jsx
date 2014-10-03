/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var request = require('superagent');
var BalanceTable = require('./BalanceTable');

var OwersPage = React.createClass({
    getInitialState: function() {
        var owers = [];
        if (this.props.rows) {
            owers = this.getOwersFromData(this.props);
        }
        return { source: '/api', owers: owers };
    },

    componentDidMount: function() {
        if (!this.props.rows) {
            this.fetch();
        }
    },

    fetch: function() {
        request.get(this.state.source, function(res) {
            if (this.isMounted()) {
                this.setState({ owers: this.getOwersFromData(res.body) });
            }
        }.bind(this));
    },

    getOwersFromData: function(data) {
        return data.rows.map(function(row) {
            var name = row.key[0];
            var verb = amount > 0 ? 'owes' : 'is owed';
            var amount = row.value;
            var link = '/' + name;
            return {
                name: name,
                verb: verb,
                amount: amount,
                link: link
            };
        }).sort(function(a, b) {
            return b.amount - a.amount;
        });
    },

    render: function() {
        return (
            <BalanceTable rows={this.state.owers} />
        );
    }
});

module.exports = OwersPage;
