var React = require('react');

var HeaderBar = React.createClass({
    render: function() {
        return (
            <header className="bar bar-nav">
                <h1 className="title">React</h1>
            </header>
        );
    }
});

module.exports = HeaderBar;
