var React = require('react');

var Header = React.createClass({
  getDefaultProps() {
    return { title: 'iouo.me' };
  },

  render() {
    return (
      <header className="bar bar-nav">
        <h1 className="title">{this.props.title}</h1>
      </header>
    );
  }
});

module.exports = Header;
