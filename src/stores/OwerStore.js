var assign = require('object-assign');
var { Map, fromJS } = require('immutable');
var request = require('superagent');

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
  request
    .get('/')
    .set('Accept', 'application/json')
    .end(function(res) {
      if (res.ok) {
        process(res.body.rows);
      } else {
        console.error('Error in API request for /', res.text);
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
  localStorage.setItem('owers', JSON.stringify(rows));
}

module.exports = OwerStore;
