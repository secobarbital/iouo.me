var React = require('react');

var TableView = React.createClass({
  render() {
    return (
      <ul className="table-view">
        {this.props.children}
      </ul>
    );
  }
});

module.exports = TableView;
