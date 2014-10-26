/** @jsx React.DOM */

var React = require('react');

var Loading = React.createClass({
    render: function() {
        return (
            <div className="content">
                <div className="content-padded">
                    Loading&hellip;
                </div>
            </div>
        );
    }
});

module.exports = Loading;
