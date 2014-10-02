var React = require('react');
var request = require('superagent');
var BalanceRow = require('./BalanceRow');

var BalanceTable = React.createClass({
    getInitialState: function() {
        return { rows: [] };
    },

    componentDidMount: function() {
        request.get(this.props.apiUrl, function(res) {
            var rows = res.body.rows.map(function(row) {
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
                rows: rows
            });
        }.bind(this));
    },

    render: function() {
        var rows = this.state.rows.map(function(row) {
            return <BalanceRow name={row.name} verb={row.verb} amount={row.amount} link={row.link} />
        });
        return (
            <ul className="table-view">
                {rows}
            </ul>
        );
    }
});

module.exports = BalanceTable;
