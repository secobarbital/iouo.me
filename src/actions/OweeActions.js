var request = require('superagent');

var Dispatcher = require('../dispatcher');
var { ActionTypes } = require('../constants');

var OweeActions = {

  fetchOwees(ower) {
    Dispatcher.handleAction({
      type: ActionTypes.FETCH_OWEES,
      ower: ower
    });

    var url = `/api/${ower}`;
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(res) {
        var rows;
        if (res.ok && res.body && res.body.rows) {
          OweeActions.receiveOwees(ower, res.body.rows);
        } else {
          OweeActions.futchOwees(url, res);
        }
      });
  },

  futchOwees(url, res) {
    Dispatcher.handleAction({
      type: ActionTypes.FUTCH_OWEES,
      url,
      res
    });
  },

  receiveOwees(ower, rows) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_OWEES,
      rows,
      ower
    })
  }

};

module.exports = OweeActions;
