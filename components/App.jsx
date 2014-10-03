/** @jsx React.DOM */

var React = require('react');
var HeaderBar = require('./HeaderBar');
var OwersPage = require('./OwersPage');

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <HeaderBar />
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = App;
