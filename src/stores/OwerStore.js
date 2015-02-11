var assign = require('object-assign');
var request = require('superagent');
var { Map } = require('immutable');

var Store = require('./Store');

var _owers = Map();

var OwerStore = assign({}, Store, {
  getAll() {
    fetchAll();
    return _owers;
  }
});

initialize();

function initialize() {
  var oldRows = localStorage.getItem('owers');
  if (oldRows) {
    process(JSON.parse(oldRows));
  }
}

function fetchAll() {
  var url = '/';
  request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(res) {
      var rows;
      if (res.ok) {
        rows = res.body.rows;
        process(rows);
        localStorage.setItem('owers', JSON.stringify(rows));
      } else {
        console.error('Error in API request', url, res.text);
      }
    })
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

module.exports = OwerStore;
