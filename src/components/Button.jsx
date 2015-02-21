var React = require('react/addons');
var { Link } = require('react-router');
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
    var Element = 'to' in otherProps ? Link : 'button';
    return (
      <Element className={cx(classes)} {...otherProps}>
        {children}
      </Element>
    );
  }
});

module.exports = Button;
