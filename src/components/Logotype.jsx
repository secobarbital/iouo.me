var React = require('react/addons');
var cx = React.addons.classSet;

var Logotype = React.createClass({
  render() {
    var { spin, ...otherProps } = this.props;
    var oClasses = cx({
      'fa': true,
      'fa-refresh': true,
      'fa-spin': spin
    });
    return (
      <span {...otherProps}>I<i className={oClasses}></i>U</span>
    );
  }
});

module.exports = Logotype;
