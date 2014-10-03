var React = require('react');
var OwersPage = require('./components/OwersPage');

require('ratchet/sass/ratchet.scss');
require('./public/stylesheets/style.styl');

window.initialRender = function() {
    React.renderComponent(
        OwersPage(initialData),
        document.querySelector('.content')
    );
}
if ('initialData' in window) {
    initialRender();
}
