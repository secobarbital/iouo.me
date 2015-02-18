var React = require('react');
var { Link, RouteHandler } = require('react-router');
var { IntlMixin } = require('react-intl');

var Header = require('./Header');

var App = React.createClass({
  mixins: [IntlMixin],

  getInitialState() {
    return {
      data: this.props.initialData
    };
  },

  componentDidMount() {
    this.setState({ data: null });
  },

  render() {
    return <RouteHandler initialData={this.state.data} />;
  }
});

module.exports = App;
