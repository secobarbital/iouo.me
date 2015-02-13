var assign = require('object-assign');
var request = require('superagent');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _owees = Map();

var OweeStore = assign({}, Store, {
  get(ower) {
    ensure(ower);
    return _owees.get(ower);
  }
});

function ensure(ower) {
  if (!_owees.get(ower)) {
    _owees = _owees.set(ower, Map());
    fetchFromStorage(ower);
  }
}

function fetchFromStorage(ower) {
  var oldRows = LocalStore.getOwees(ower);
  if (oldRows) {
    process(JSON.parse(oldRows));
  }
}

function process(rows) {
  _owees = _owees.withMutations(map => {
    rows.forEach(row => {
      var { key, value } = row;
      map.setIn(key, value);
    });
  });
  OweeStore.emitChange();
}

OweeStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.RECEIVE_OWEES:
      var { ower, rows } = action;
      process(rows);
      break;

    default:
  }
});

module.exports = OweeStore;
