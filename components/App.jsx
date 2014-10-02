var React = require('react');
var HeaderBar = require('./HeaderBar');
var Content = require('./Content');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <HeaderBar />
                <Content /> 
            </div>
        );
    }
});

module.exports = App;
