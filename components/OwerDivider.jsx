/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var OwerRow = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var amount = this.props.amount;
        var verb = amount > 0 ? 'owes' : 'is owed';
        var formattedAmount = accounting.formatMoney(Math.abs(amount), '');
        return (
            <li className="table-view-divider">
                <div className="balance-divider-rhs">
                    <span className="currency">$</span> <span className="amount">{formattedAmount}</span>
                </div>
                <span className="subject">@{ower}</span> <span className="verb">{verb}</span>
            </li>
        );
    }
});

module.exports = OwerRow;
