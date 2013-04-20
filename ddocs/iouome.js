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

        if (doc.raw && doc.ower && doc.owee && doc.amount) {
          ower = doc.raw.user.screen_name;
          owee = doc.raw.in_reply_to_screen_name;
          amount = doc.amount;
          if (ower && owee && amount) {
            amount = parseFloat(amount);
            emit([ower, owee], amount);
            emit([owee, ower], -amount);
          }
        }
      },
      reduce: '_sum'
    }
  }
}
