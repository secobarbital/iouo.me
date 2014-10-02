var accounting = require('accounting');
var React = require('react');
var request = require('superagent');
var BalanceTable = require('./BalanceTable');

var OwersPage = React.createClass({
    getInitialState: function() {
        return { apiUrl: '/api', owers: [] };
    },

    componentDidMount: function() {
        request.get(this.state.apiUrl, function(res) {
            var owers = res.body.rows.map(function(row) {
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
            this.setState({
                apiUrl: this.state.apiUrl,
                owers: owers
            });
        }.bind(this));
    },

    render: function() {
        return (
            <div className="content">
                <BalanceTable rows={this.state.owers} />
            </div>
        );
    }
});

module.exports = OwersPage;
