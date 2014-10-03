var React = require('react');
var OwersPage = require('./components/OwersPage');

require('ratchet/sass/ratchet.scss');
require('./public/stylesheets/style.styl');

React.renderComponent(
    OwersPage(initialData),
    document.querySelector('.content')
);
