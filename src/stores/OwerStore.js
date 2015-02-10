var assign = require('object-assign');
var { fromJS } = require('immutable');

var Store = require('./Store');

var _owers = fromJS({
  "hnguyen11084":-30.809999999999995,
  "choonhongpeck":190.94999999999996,
  "secobarbital":-345.01158999999996
});

var OwerStore = assign({}, Store, {
  getAll: function() {
    return _owers;
  }
});

module.exports = OwerStore;
