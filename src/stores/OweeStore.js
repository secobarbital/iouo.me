var assign = require('object-assign');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _owees = Map();

var OweeStore = assign({}, Store, {
  get(ower, data) {
    if (data) {
      return process(Map(), data.rows).get(ower);
    }
    ensure(ower);
    return _owees.get(ower);
  }
});

function ensure(ower) {
  if (!_owees.get(ower)) {
    fetchFromStorage(ower);
  }
}

function fetchFromStorage(ower) {
  var oldRows = LocalStore.getOwees(ower);
  if (oldRows) {
    merge(oldRows);
  }
}

function process(owees, rows) {
  return owees.withMutations(map => {
    rows.forEach(row => {
      var { key, value } = row;
      map.setIn(key, value);
    });
  });
}

function merge(rows) {
  var owees = process(_owees, rows);
  if (owees !== _owees) {
    _owees = owees;
    OweeStore.emitChange();
  }
}

OweeStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.RECEIVE_OWEES:
      merge(action.rows);
      break;

    default:
  }
});

module.exports = OweeStore;
