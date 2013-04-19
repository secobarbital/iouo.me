module.exports = {
  _id: '_design/iouome',
  views: {
    by_raw_id: {
      map: function(doc) {
        if (doc.raw && doc.raw.id_str) emit(doc.raw.id_str);
      }
    },
    balances: {
      map: function(doc) {
        var ower, owee, amount;

        if (doc.raw && ~doc.raw.text.indexOf('#iou')) {
          ower = doc.raw.user.screen_name;
          owee = doc.raw.text.match(/@(\w+)/)[1];
          amount = doc.raw.text.match(/#iou\s+\$?([.\d]+)/i)[1];
          if (ower && owee && amount) {
            amount = parseFloat(amount);
            emit([ower, owee], amount);
            emit([owee, ower], -amount);
          }
        }
      }
    }
  }
}
