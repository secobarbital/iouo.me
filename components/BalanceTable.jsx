var React = require('react');
var BalanceRow = require('./BalanceRow');

var BalanceTable = React.createClass({
    render: function() {
        var rows = this.props.rows.map(function(row) {
            return <BalanceRow key={'balances-' + row.name} name={row.name} verb={row.verb} amount={row.amount} link={row.link} />
        });
        return (
            <ul className="table-view">
                {rows}
            </ul>
        );
    }
});

module.exports = BalanceTable;
