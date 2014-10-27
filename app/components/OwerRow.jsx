/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var OwerRow = React.createClass({
    render: function() {
        var ower = this.props.ower;
        var verb = this.props.verb;
        var amount = this.props.amount;
        var formattedAmount = accounting.formatMoney(Math.abs(amount), '');
        return (
            <li className="table-view-cell">
                <Link to={this.props.to} params={this.props.params} className="navigate-right">
                    <div className="balance-row-rhs">
                        <span className="currency">$</span> <span className="amount">{formattedAmount}</span>
                    </div>
                    <span className="subject">@{ower}</span> <span className="verb">{verb}</span>
                </Link>
            </li>
        );
    }
});

module.exports = OwerRow;
