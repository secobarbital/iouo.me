var assign = require('object-assign');
var { fromJS } = require('immutable');

var Store = require('./Store');

var _owees = fromJS({
  "secobarbital": {
    "choonhongpeck":-127.94999999999997,
    "hnguyen11084":14.009999999999998
  },
  "hnguyen11084": {
    "secobarbital":-30.809999999999995,
    "choonhongpeck":20.809999999999995
  },
  "choonhongpeck": {
    "hnguyen11084":190.94999999999996,
    "secobarbital":-345.01158999999996
  }
});

var OweeStore = assign({}, Store, {
  get: function(ower) {
    return _owees.get(ower);
  },

  getAll: function() {
    return _owees;
  }
});

module.exports = OweeStore;
