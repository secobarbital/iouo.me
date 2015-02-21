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
        if (res.ok && res.body && res.body.rows) {
          OwerActions.receiveOwers(res.body.rows);
        } else {
          OwerActions.futchOwers(url, res);
        }
      });
  },

  futchOwers(url, res) {
    Dispatcher.handleAction({
      type: ActionTypes.FUTCH_OWERS,
      url,
      res
    });
  },

  receiveOwers(rows) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_OWERS,
      rows
    });
  }

};

module.exports = OwerActions;
