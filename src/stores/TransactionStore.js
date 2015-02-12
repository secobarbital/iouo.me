var assign = require('object-assign');
var request = require('superagent');
var { Map, OrderedMap, fromJS } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var { ActionTypes } = require('../constants');

var _transactions = Map();

var TransactionStore = assign({}, Store, {
  get(ower, owee) {
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
  var oldRows = localStorage.getItem(`transactions/${ower}/${owee}`);
  if (oldRows) {
    process(JSON.parse(oldRows));
  }
}

function process(rows) {
  _transactions = _transactions.withMutations(map => {
    rows.forEach(row => {
      var { key, doc } = row;
      var keyPath = [].concat(key, doc._id);
      map.setIn(keyPath, fromJS(doc));
    });
  });
  TransactionStore.emitChange();
}

TransactionStore.dispatchToken = Dispatcher.register(payload => {
  var { action } = payload;

  switch(action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      var { ower, owee, rows } = action;
      process(rows);
      localStorage.setItem(`transactions/${ower}/${owee}`, JSON.stringify(rows));
      break;

    default:
  }
});

module.exports = TransactionStore;
