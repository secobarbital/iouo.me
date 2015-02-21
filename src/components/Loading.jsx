var React = require('react');

var Content = require('./Content');
var Logotype = require('./Logotype');

var Loading = React.createClass({
  render() {
    return (
      <Content>
        <div style={styles.center}>
          <Logotype spin />
        </div>
      </Content>
    );
  }
});

var styles = {
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translate(-50%,-50%)',
    MsTransform: 'translate(-50%,-50%)',
    transform: 'translate(-50%,-50%)'
  }
};

module.exports = Loading;
