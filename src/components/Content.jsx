var React = require('react');

var sx = require('../utils/styleSet');

var Content = React.createClass({
  render() {
    var { children, style, ...otherProps } = this.props;
    return (
      <div className="content" style={sx(styles.root, style)}>
        {children}
      </div>
    );
  }
});

var styles = {
  root: {
    backgroundColor: 'whitesmoke',
    color: '#333'
  }
};

module.exports = Content;
