var React = require('react');

var Header = React.createClass({
  render() {
    var { children, ...otherProps } = this.props;
    return (
      <header className="bar bar-nav" {...otherProps}>
        {children}
      </header>
    );
  }
});

module.exports = Header;
