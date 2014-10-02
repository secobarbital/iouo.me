var React = require('react');
var App = require('./components/App.jsx');

require('ratchet/sass/ratchet.scss');
require('./public/stylesheets/style.styl');

React.renderComponent(
    App(),
    document.body
);
