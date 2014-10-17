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

        render: function() {
            var activeRouteHandler = this.props.activeRouteHandler;
            var data = this.state.data;
            return (
                <div className="app">
                    <HeaderBar />
                    <div className="content">
                        <activeRouteHandler initialData={data} />
                    </div>
                </div>
            );
        }
    });
    return App;
}

module.exports = AppFactory;
