/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HeaderBar = React.createClass({
    render: function() {
        var title = this.props.title || 'iouo.me';
        var leftNavProps = this.props.leftNav;
        var leftNav;
        if (leftNavProps) {
            leftNav = <Link to={leftNavProps.to} params={leftNavProps.params} className="icon icon-left-nav pull-left" />
        }
        return (
            <header className="bar bar-nav">
                {leftNav}
                <h1 className="title">{title}</h1>
            </header>
        );
    }
});

module.exports = HeaderBar;
