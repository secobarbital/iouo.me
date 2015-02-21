var request = require('superagent');

var Dispatcher = require('../dispatcher');
var { ActionTypes } = require('../constants');

var TransactionActions = {

  fetchTransactions(ower, owee) {
    Dispatcher.handleAction({
      type: ActionTypes.FETCH_TRANSACTIONS,
      ower: ower,
      owee: owee
    });

    var url = `/api/${ower}/${owee}`;
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(res) {
        var rows;
        if (res.ok && res.body && res.body.rows) {
          TransactionActions.receiveTransactions(ower, owee, res.body.rows);
        } else {
          TransactionActions.futchTransactions(url, res);
        }
      });
  },

  futchTransactions(url, res) {
    Dispatcher.handleAction({
      type: ActionTypes.FUTCH_TRANSACTIONS,
      url,
      res
    })
  },

  receiveTransactions(ower, owee, rows) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_TRANSACTIONS,
      rows,
      ower,
      owee
    });
  }

};

module.exports = TransactionActions;
