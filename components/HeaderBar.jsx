/** @jsx React.DOM */

var React = require('react');

var HeaderBar = React.createClass({
    render: function() {
        var leftNav = this.props.leftNav;
        var title = this.props.title || 'iouo.me';
        return (
            <header className="bar bar-nav">
                {leftNav && leftNav()}
                <h1 className="title">{title}</h1>
            </header>
        );
    }
});

module.exports = HeaderBar;
