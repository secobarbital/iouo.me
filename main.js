var React = require('react');
var HeaderBar = require('./components/HeaderBar.jsx');
require('./public/stylesheets/style.styl');

React.renderComponent(
    HeaderBar(),
    document.body
);
