var React = require('react');
var { Link, Navigation } = require('react-router');

var sx = require('../utils/styleSet');

var BackButton = React.createClass({
  mixins: [Navigation],

  render() {
    var { className, style, ...otherProps } = this.props;
    className = className && className.trim() && ` ${className.trim()}`;
    className = className || '';
    className = `fa fa-chevron-left${className}`;
    style = sx(styles.root, style);
    return (
      <Link className={className} style={style} onClick={this.goBack} {...otherProps} />
    );
  }
});

var styles = {
  root: {
    position: 'relative',
    float: 'left',
    zIndex: 20,
    lineHeight: '44px',
    fontSize: 17,
    color: 'inherit'
  }
};

module.exports = BackButton;
