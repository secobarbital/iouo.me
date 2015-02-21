var React = require('react');
var { Link, Navigation } = require('react-router');

var BackButton = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <Link className="icon icon-left-nav pull-left" onClick={this.goBack} {...this.props} />
    );
  }
});

module.exports = BackButton;
