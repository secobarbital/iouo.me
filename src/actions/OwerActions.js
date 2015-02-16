var request = require('superagent');

var Dispatcher = require('../dispatcher');
var { ActionTypes } = require('../constants');

var OwerActions = {

  fetchOwers() {
    Dispatcher.handleAction({
      type: ActionTypes.FETCH_OWERS
    });

    var url = '/api';
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(res) {
        var rows;
        if (res.ok) {
          OwerActions.receiveOwers(res.body.rows);
        } else {
          console.error('Error in API request', url, res.text);
        }
      });
  },

  receiveOwers(rows) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_OWERS,
      rows: rows
    });
  }

};

module.exports = OwerActions;
