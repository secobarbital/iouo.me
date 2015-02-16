var React = require('react');

var Card = React.createClass({
  render() {
    var { children, ...otherProps } = this.props;
    return (
      <div className="card" {...otherProps}>
        {children}
      </div>
    );
  }
});

module.exports = Card;
