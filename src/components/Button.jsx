var React = require('react/addons');
var cx = React.addons.classSet;

var Button = React.createClass({
  render() {
    var {
      children, primary, positive, negative, block, link, outlined, ...otherProps
    } = this.props;
    var classes = {
      'btn': true,
      'btn-primary': primary,
      'btn-positive': positive,
      'btn-negative': negative,
      'btn-block': block,
      'btn-link': link,
      'btn-outlined': outlined
    };
    return (
      <button className={cx(classes)} {...otherProps}>
        {children}
      </button>
    );
  }
});

module.exports = Button;
