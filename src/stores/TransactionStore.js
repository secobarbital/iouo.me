var assign = require('object-assign');
var { Map, OrderedMap, fromJS } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _inflight = false;
var _transactions = Map();

var TransactionStore = assign({}, Store, {
  get(ower, owee) {
    ensure(ower, owee);
    return _transactions.getIn([ower, owee]);
  },

  getInflight() {
    return _inflight;
  }
});

function ensure(ower, owee) {
  var keyPath = [ower, owee];
  if (!_transactions.getIn(keyPath)) {
    _transactions = _transactions.setIn(keyPath, OrderedMap());
    fetchFromStorage(ower, owee);
  }
}

function fetchFromStorage(ower, owee) {
  var oldRows = LocalStore.getTransactions(ower, owee);
  if (oldRows) {
    process(oldRows);
  }
}

function process(rows) {
  _transactions = _transactions.withMutations(map => {
    rows.forEach(row => {
      var { key, doc } = row;
      var keyPath = [].concat(key, doc._id);
      map.setIn(keyPath, fromJS(row));
    });
  });
  TransactionStore.emitChange();
}

TransactionStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.FETCH_TRANSACTIONS:
      _inflight = true;
      TransactionStore.emitChange();
      break;

    case ActionTypes.FUTCH_TRANSACTIONS:
      _inflight = false;
      TransactionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_TRANSACTIONS:
      _inflight = false;
      process(action.rows);
      break;

    default:
  }
});

module.exports = TransactionStore;
