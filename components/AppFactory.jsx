/** @jsx React.DOM */

var React = require('react');
var HeaderBar = require('./HeaderBar');

var AppFactory = function(initialData) {
    var App = React.createClass({
        getInitialState: function() {
            return {
                data: initialData
            };
        },

        componentDidMount: function() {
            this.setState({ data: null });
        },

        setLeftNav: function(leftNav) {
            this.setState({ leftNav: leftNav });
        },

        setTitle: function(title) {
            this.setState({ title: title });
            if (title) {
                document.title = title + ' - iouo.me';
            } else {
                document.title = 'iouo.me';
            }
        },

        render: function() {
            var activeRouteHandler = this.props.activeRouteHandler;
            var data = this.state.data;
            var leftNav = this.state.leftNav;
            var title = this.state.title;
            return (
                <div className="app">
                    <HeaderBar title={title} leftNav={leftNav} />
                    <activeRouteHandler initialData={data} setLeftNav={this.setLeftNav} setTitle={this.setTitle} />
                </div>
            );
        }
    });
    return App;
}

module.exports = AppFactory;
