var assign = require('object-assign');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _inflight = false;
var _owees = Map();

var OweeStore = assign({}, Store, {
  get(ower) {
    ensure(ower);
    return _owees.get(ower);
  },

  getInflight() {
    return _inflight;
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
    process(oldRows);
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
    case ActionTypes.FETCH_OWEES:
      _inflight = true;
      OweeStore.emitChange();
      break;

    case ActionTypes.FUTCH_OWEES:
      _inflight = false;
      OweeStore.emitChange();
      break;

    case ActionTypes.RECEIVE_OWEES:
      _inflight = false;
      process(action.rows);
      break;

    default:
  }
});

module.exports = OweeStore;
