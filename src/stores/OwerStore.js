var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var { OrderedMap, fromJS } = require('immutable');

var CHANGE_EVENT = 'change';

var _owers = fromJS({
  "hnguyen11084":-30.809999999999995,
  "choonhongpeck":190.94999999999996,
  "secobarbital":-345.01158999999996
}).sortBy(v => -v);

var OwerStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _owers;
  }
});

module.exports = OwerStore;
