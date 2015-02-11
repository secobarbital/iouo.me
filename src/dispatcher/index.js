var { Dispatcher } = require('flux');
var assign = require('object-assign');

module.exports = assign(new Dispatcher(), {

  handleAction(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }

});
