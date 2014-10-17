var React = window.React = require('react');
var RoutesFactory = require('./components/RoutesFactory');

require('ratchet/sass/ratchet.scss');
require('./public/stylesheets/style.styl');

window.initialRender = function(initialData) {
    React.renderComponent(RoutesFactory(initialData), document.body);
};
if ('initialData' in window) {
    initialRender(initialData);
}
