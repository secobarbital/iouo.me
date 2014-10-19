/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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

module.exports = OweeRow;
