var React = require('react');

var Title = React.createClass({
  render() {
    return (
      <h1 className="title" style={styles.root}>
        {this.props.children}
      </h1>
    );
  }
});

var styles = {
  root: {
    paddingLeft: 44,
    paddingRight: 44,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

module.exports = Title;
