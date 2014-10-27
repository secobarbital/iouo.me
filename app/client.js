var React = window.React = require('react');
var RoutesFactory = require('./components/RoutesFactory');

require('./style.styl');

window.initialRender = function(initialData) {
    React.renderComponent(RoutesFactory(initialData), document.body);
};
if ('initialData' in window) {
    initialRender(initialData);
}
