var assign = require('object-assign');
var { Map, OrderedMap, fromJS } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var LocalStore = require('./LocalStore');
var { ActionTypes } = require('../constants');

var _transactions = Map();

var TransactionStore = assign({}, Store, {
  get(ower, owee, data) {
    if (data) {
      return process(OrderedMap(), data.rows);
    }
    ensure(ower, owee);
    return _transactions.getIn([ower, owee]);
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
    merge([ower, owee], oldRows);
  }
}

function process(transactions, rows) {
  return transactions.withMutations(map => {
    rows.forEach(row => {
      map.set(row.id, fromJS(row));
    });
  });
}

function merge(keyPath, rows) {
  var transactions = _transactions.updateIn(keyPath, map => process(map, rows));
  if (transactions !== _transactions) {
    _transactions = transactions;
    TransactionStore.emitChange();
  }
}

TransactionStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      var { ower, owee, rows } = action;
      merge([ower, owee], rows);
      break;

    default:
  }
});

module.exports = TransactionStore;
