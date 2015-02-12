var request = require('superagent');

var Dispatcher = require('../dispatcher');
var { ActionTypes } = require('../constants');

var OweeActions = {

  fetchOwees(ower) {
    Dispatcher.handleAction({
      type: ActionTypes.FETCH_OWEES,
      ower: ower
    });

    var url = `/${ower}`;
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(res) {
        var rows;
        if (res.ok) {
          OweeActions.receiveOwees(ower, res.body.rows);
        } else {
          console.error('Error in API request', url, res.text);
        }
      });
  },

  receiveOwees(ower, rows) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_OWEES,
      rows: rows,
      ower: ower
    })
  }

};

module.exports = OweeActions;
