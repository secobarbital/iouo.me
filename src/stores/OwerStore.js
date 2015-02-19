var assign = require('object-assign');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _owers;

var OwerStore = assign({}, Store, {
  getAll(data) {
    if (data) {
      return process(Map(), data.rows);
    }
    ensure();
    return _owers;
  }
});

function ensure() {
  if (!_owers) {
    fetchFromStorage();
  }
}

function fetchFromStorage() {
  var oldRows = LocalStore.getOwers();
  if (oldRows) {
    _owers = merge(oldRows);
  }
}

function process(owers, rows) {
  return owers.withMutations(map => {
    rows.forEach(row => {
      var { key, value } = row;
      map.setIn(key, value);
    });
  });
}

function merge(rows) {
  if (!_owers) {
    _owers = Map();
  }
  var owers = process(_owers, rows);
  if (owers !== _owers) {
    _owers = owers;
    OwerStore.emitChange();
  }
}

OwerStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.RECEIVE_OWERS:
      merge(action.rows);
      break;

    default:
  }
});

module.exports = OwerStore;
