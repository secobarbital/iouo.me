/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var OwerHeader = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var amount = this.props.amount;
        var verb = amount > 0 ? 'owes' : 'is owed';
        var formattedAmount = accounting.formatMoney(Math.abs(amount), '');
        return (
            <div className="content-padded balance-header">
                <span className="verb">{verb}</span> <span className="currency">$</span> <span className="amount">{formattedAmount}</span>
            </div>
        );
    }
});

module.exports = OwerHeader;
