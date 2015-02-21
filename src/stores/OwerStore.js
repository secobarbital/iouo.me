var assign = require('object-assign');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _inflight = false;
var _owers;

var OwerStore = assign({}, Store, {
  getAll() {
    ensure();
    return _owers;
  },

  getInflight() {
    return _inflight;
  }
});

function ensure() {
  if (!_owers) {
    _owers = Map();
    fetchFromStorage();
  }
}

function fetchFromStorage() {
  var oldRows = LocalStore.getOwers();
  if (oldRows) {
    process(oldRows);
  }
}

function process(rows) {
  _owers = _owers.withMutations(map => {
    rows.forEach(row => {
      var { key, value } = row;
      map.setIn(key, value);
    });
  });
  OwerStore.emitChange();
}

OwerStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.FETCH_OWERS:
      _inflight = true;
      OwerStore.emitChange();
      break;

    case ActionTypes.FUTCH_OWERS:
      _inflight = false;
      OwerStore.emitChange();
      break;

    case ActionTypes.RECEIVE_OWERS:
      _inflight = false;
      process(action.rows);
      break;

    default:
  }
})

module.exports = OwerStore;
