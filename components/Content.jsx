var React = require('react');
var BalanceTable = require('./BalanceTable');

var Content = React.createClass({
    render: function() {
        return (
            <div className="content">
                <BalanceTable apiUrl="/api" />
            </div>
        );
    }
});

module.exports = Content;
