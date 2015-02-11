var assign = require('object-assign');
var request = require('superagent');
var { Map } = require('immutable');

var Dispatcher = require('../dispatcher');
var Store = require('./Store');
var { ActionTypes } = require('../constants');

var _owers;

var OwerStore = assign({}, Store, {
  getAll() {
    ensure();
    return _owers;
  }
});

function ensure() {
  if (!_owers) {
    _owers = Map();
    prefill();
  }
}

function prefill() {
  var oldRows = localStorage.getItem('owers');
  if (oldRows) {
    process(JSON.parse(oldRows));
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
    case ActionTypes.INITIALIZE:
      OwerStore.init();
      break;

    case ActionTypes.RECEIVE_OWERS:
      process(action.rows);
      localStorage.setItem('owers', JSON.stringify(action.rows));
      break;

    default:
  }
})

module.exports = OwerStore;
