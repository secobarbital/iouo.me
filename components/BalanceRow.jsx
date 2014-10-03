/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');

var BalanceRow = React.createClass({
    render: function() {
        var formattedAmount = accounting.formatMoney(Math.abs(this.props.amount), '');
        return (
            <li className="table-view-cell">
                <a className="navigate-right" href={this.props.link}>
                    <div className="balance-row-rhs">
                        <span className="currency">$</span> <span className="amount">{formattedAmount}</span>
                    </div>
                    <span className="subject">@{this.props.name}</span> <span className="verb">{this.props.verb}</span>
                </a>
            </li>
        );
    }
});

module.exports = BalanceRow;
