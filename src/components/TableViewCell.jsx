var React = require('react');

var TableViewCell = React.createClass({
  render() {
    var { children, ...otherProps } = this.props;
    return (
      <li className="table-view-cell" {...otherProps}>
        {children}
      </li>
    );
  }
});

module.exports = TableViewCell;
