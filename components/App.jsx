var React = require('react');
var HeaderBar = require('./HeaderBar');
var OwersPage = require('./OwersPage');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <HeaderBar />
                <OwersPage /> 
            </div>
        );
    }
});

module.exports = App;
