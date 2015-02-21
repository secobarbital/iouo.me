var React = require('react');
var sx = require('../utils/styleSet');

var Title = React.createClass({
  render() {
    var { children, style, ...otherProps } = this.props;
    style = sx(styles.root, style);
    return (
      <h1 className="title" style={sx(styles.root, style)}>
        {children}
      </h1>
    );
  }
});

var styles = {
  root: {
    paddingLeft: 44,
    paddingRight: 44,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#222'
  }
};

module.exports = Title;
