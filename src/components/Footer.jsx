var React = require('react');

var Footer = React.createClass({
  render() {
    var { children, ...otherProps } = this.props;
    return (
      <footer className="bar bar-standard bar-footer">
        {children}
      </footer>
    );
  }
});

module.exports = Footer;
