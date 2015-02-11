var assign = require('object-assign');
var request = require('superagent');
var { Map } = require('immutable');

var Store = require('./Store');

var _owees = Map();

var OweeStore = assign({}, Store, {
  get(ower) {
    console.log('get', ower, _owees.toJS())
    fetch(ower);
    return _owees.get(ower);
  },

  getAll: () => _owees
});

function fetch(ower) {
  var url = `/${ower}`;
  request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(res) {
      var rows;
      if (res.ok) {
        rows = res.body.rows;
        process(rows);
        localStorage.setItem(`owees/${ower}`, JSON.stringify(rows));
      } else {
        console.error('Error in API request', url, res.text);
      }
    });
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

module.exports = OweeStore;
