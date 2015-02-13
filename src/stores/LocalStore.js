var assign = require('object-assign');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var { ActionTypes } = require('../constants');

var LocalStore = assign({}, Store, {
  getOwers() {
    var rows = localStorage.getItem(getKey());
    return rows && JSON.parse(rows);
  },

  getOwees(ower) {
    var rows = localStorage.getItem(getKey(ower));
    return rows && JSON.parse(rows);
  },

  getTransactions(ower, owee) {
    var rows = localStorage.getItem(getKey(ower, owee));
    return rows && JSON.parse(rows);
  }
});

function getKey(ower, owee) {
  if (owee) {
    return `transactions/${ower}/${owee}`;
  }
  if (ower) {
    return `owees/${ower}`;
  }
  return 'ower';
}

LocalStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {

    case ActionTypes.RECEIVE_OWERS:
      var { rows } = action;
      localStorage.setItem(getKey(), JSON.stringify(rows));
      break;

    case ActionTypes.RECEIVE_OWEES:
      var { ower, rows } = action;
      localStorage.setItem(getKey(ower), JSON.stringify(rows));
      break;

    case ActionTypes.RECEIVE_TRANSACTIONS:
      var { ower, owee, rows } = action;
      localStorage.setItem(getKey(ower, owee), JSON.stringify(rows));
      break;

    default:
  }
})

module.exports = LocalStore;
