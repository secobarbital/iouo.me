var React = require('react');

var TableViewCell = React.createClass({
  render() {
    var { children, className, ...otherProps } = this.props;
    className = className ? `table-view-cell ${className}` : 'table-view-cell';
    return (
      <li className={className} {...otherProps}>
        {children}
      </li>
    );
  }
});

module.exports = TableViewCell;
