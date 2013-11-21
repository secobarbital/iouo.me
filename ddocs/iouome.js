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

        if (doc.ower && doc.owee && doc.amount) {
          ower = doc.ower
          owee = doc.owee
          amount = doc.amount;
          amount = parseFloat(amount);
          if (via) {
            emit([ower, via], amount);
            emit([via, owee], amount);
            emit([via, ower], -amount);
            emit([owee, via], -amount);
          } else {
            emit([ower, owee], amount);
            emit([owee, ower], -amount);
          }
        }
      },
      reduce: '_sum'
    }
  }
}
