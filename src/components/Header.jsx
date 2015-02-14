var React = require('react');

var Header = React.createClass({
  render() {
    return (
      <header className="bar bar-nav">
        {this.props.children}
      </header>
    );
  }
});

module.exports = Header;
